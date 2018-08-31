[![Published on Vaadin  Directory](https://img.shields.io/badge/Vaadin%20Directory-published-00b4f0.svg)](https://vaadin.com/directory/component/jifalopstime-diff)
[![Stars on vaadin.com/directory](https://img.shields.io/vaadin-directory/star/jifalopstime-diff.svg)](https://vaadin.com/directory/component/jifalopstime-diff)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/jifalops/time-diff)

# time-diff
Friendly description of a time difference (i.e. timeago) with variable precision.

## Installation

```
bower install --save jifalops/time-diff
```

## Usage
Set the `from` and `to` properties. `from` defaults to `Date.now()`.

## Demo
<!--
```
<custom-element-demo>
  <template>
    <script src="../webcomponentsjs/webcomponents-lite.js"></script>
    <link rel="import" href="time-diff.html">
    <next-code-block></next-code-block>
    <script>
      var now = Date.now();
      document.getElementById('ex1').to = now + 1200;
      document.getElementById('ex2').to = now - 10000;
      document.getElementById('ex3').to = now + 3*7*24*60*60*1000;
      document.getElementById('ex4').to = now - 1000;
      document.getElementById('ex5').to = now + 13*30*24*60*60*1000;
      document.getElementById('ex6').from = now;
      document.getElementById('ex6').to = now - 100;
      document.getElementById('ex7').to = now - 24*60*60*1000;
    </script>
  </template>
</custom-element-demo>
```
-->

```html
<time-diff id="ex1"></time-diff><br/>
<time-diff id="ex2" relative></time-diff><br/>
<time-diff id="ex3" relative></time-diff><br/>
<time-diff id="ex4" relative min-unit="month"></time-diff><br/>
<time-diff id="ex5" relative max-unit="year"></time-diff><br/>
<time-diff id="ex6"></time-diff><br/>
<time-diff id="ex7"></time-diff><br/>
```

Full demo:
[webcomponents.org](https://www.webcomponents.org/element/jifalops/time-diff/demo/demo/index.html)
| [github](https://jifalops.github.io/time-diff/components/time-diff/demo/).

API: [webcomponents.org](https://www.webcomponents.org/element/jifalops/time-diff/time-diff)
| [github](https://jifalops.github.io/time-diff).

## Contributing

1. Fork it on Github.
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request

## License

[MIT](https://opensource.org/licenses/MIT)
