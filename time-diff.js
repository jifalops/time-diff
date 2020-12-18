import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import moment from 'moment/src/moment.js';
/**
 * `time-diff`
 * Friendly description of a time difference with variable precision.
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class TimeDiff extends PolymerElement {
  static get template() {
    return html`
    [[diff]]
    `;
  }

  static get is() { return 'time-diff'; }
  static get properties() {
    return {
      /**
      * The time in milliseconds to calculate the difference _from_.
      * @default Date.now()
      */
      from: {
        type: Number,
        value: function() { return Date.now(); }
      },
      /**
      * The time in milliseconds to calculate the difference _to_.
      */
      to: {
        type: Number,
      },
      /**
      * The cutoff for how fine-grained `diff` can be. Differences less
      * than one `minUnit` will include the string "less than a [minUnit]"
      * instead of using a more precise unit.
      * * less than a minute
      * * less than a minute ago
      * * in less than a minute
      *
      * @see `units`
      *
      * Leave blank for no limit (e.g. "0" is allowed rather than
      * "less than a millisecond").
      */
      minUnit: {
        type: String,
        value: ''
      },
      /**
      * The cutoff for how coarse-grained `diff` can be. Time differences greater
      * than one `maxUnit` will include the string "more than a [maxUnit]"
      * instead of e.g. "2 [maxUnit]s".
      * * more than a year
      * * more than a year ago
      * * in more than a year
      *
      * @see `units`
      *
      * Leave blank for no limit (e.g. "5 years" is allowed).
      */
      maxUnit: {
        type: String,
        value: ''
      },
      /**
      * Whether the diff should include "in/ago" qualifiers
      * ("5 minutes" vs. "in 5 minutes" or "5 minutes ago")
      */
      relative: {
        type: Boolean,
        value: false
      },
      /**
      * The difference of `from` and `to` in human friendly format using momentJs.
      *
      * Examples:
      * * 10 seconds
      * * 5 minutes ago
      * * in 3 months
      * * less than a week ago
      * * in more than a year
      */
      diff: {
        type: String,
        notify: true,
        computed: '_calculateDiff(from, to, minUnit, maxUnit, relative)'
      },
      /**
      * The time units in increasing order.
      * These units are compared to the output of `moment().to()`
      * @see https://momentjs.com/docs/#/displaying/to/
      */
      _units: {
        type: Array,
        readOnly: true,
        value: function() {
          return [
            'millisecond', 'second', 'minute', 'hour',
            'day', 'week', 'month', 'year'
          ];
        }
      }
    };
  }
  _calculateDiff(from, to, minUnit, maxUnit, relative) {
    if ((!from && from !== 0) || (!to && to !== 0)) return;

    if (from == to) {
      return minUnit ? 'less than a ' + minUnit : '0';
    }

    let diff = to - from;
    let duration = moment.duration(diff);
    let humanized = duration.humanize(relative);
    let unit = this._findUnit(humanized);
    let tmp = humanized.match(/\d+/);
    let magnitude = tmp && tmp.length ? tmp[0] : 1;

    // Handle units smaller than allowed.
    if (minUnit && this._isLessThan(unit, minUnit)) {
      return this._makeString(diff, magnitude, minUnit, relative, 'less');
    }
    // Handle units larger than allowed.
    if (maxUnit && !this._isLessThan(unit, maxUnit)) {
      return this._makeString(diff, magnitude, maxUnit, relative, 'more');
    }

    // If we get here and the unit is not in seconds, it is the desired result.
    if (unit != 'second') {
      return humanized;
    } else {
      let abs = Math.abs(diff);
      if (abs < 1000 && (!minUnit || minUnit == 'millisecond')) {
        return this._makeString(diff, abs, 'millisecond', relative);
      }
      if (abs >= 1000 && abs < 10000) {
        return this._makeString(diff, Math.round(abs / 100) / 10, 'second', relative);
      } else {
        return this._makeString(diff, Math.round(abs / 1000), 'second', relative);
      }
    }
  }

  /**
  *
  */
  _makeString(diff, magnitude, unit, relative, lessOrMore) {
    let prefix = (relative && diff > 0) ? 'in ' : '';
    let suffix = (relative && diff < 0) ? ' ago' : '';
    if (magnitude !== 1 && !lessOrMore) unit += 's';
    return prefix + (lessOrMore
      ? (lessOrMore + ' than a ')
      : (magnitude === 1 ? 'a' : magnitude))
      + ' ' + unit + suffix;
  }

  _isLessThan(u1, u2) {
    return this._units.indexOf(u1) < this._units.indexOf(u2);
  }

  _findUnit(string) {
    for (let unit of this._units) {
      if (string.includes(unit)) return unit;
    }
  }
}

window.customElements.define(TimeDiff.is, TimeDiff);
