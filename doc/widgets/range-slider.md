## `<ng-ais-range-slider />`

The range slider is a widget which provides a user-friendly way to filter the results based on a single numeric range.

You will need to import by yourself the external CSS in order to make the range slider work. The CSS is available:

* `https://cdnjs.cloudflare.com/ajax/libs/noUiSlider/10.1.0/nouislider.min.css` (CDN)
* `node_modules/nouislider/distribute/nouislider.min.css` (LOCAL)

| Attributes       | Type       | Description
| -                | -          | -
| `attribute`      | `string`   | Name of the attribute for faceting
| `pips?`          | `boolean`  | Show slider pips
| `tooltips?`      | `boolean`  | Should we show tooltips or not.
| `min?`           | `number`   | Minimal slider value, default to automatically computed
| `max?`           | `number`   | Minimal slider value, default to automatically computed
