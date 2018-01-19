## `<ng-ais-current-refinements />`

The current refinements widget has two purposes:

* give the user a synthetic view of the current filters.
* give the user the ability to remove a filter.

This widget is usually in the top part of the search UI.

| Attributes       | Type                            | Description
| -                | -                               | -
| `attributes?`    | `{name: string, label: string}` | Label definitions for the different filters
| `onlyListedAttributes?` | `boolean` | Only use the declared attributes. By default, the widget displays the refinements for the whole search state. If true, the list of `attributes` in attributes is used
| `clearRefinements?`      | `"before" / "after" / boolean`  | Defines the clear all button position. By default, it is placed before the set of current filters. If the value is false, the button won’t be added in the widget
| `clearsQuery?`   | `boolean`                       | If true, the clear all button also clears the active search query.
| `clearRefinementsLabel?` | `string`                        | Label used on the clear all button.
| `header?`        | `string`                        | Displays text before widget
| `footer?`        | `string`                        | Displays text after widget
| `autoHideContainer?` | `boolean`  | Hides the widget if there's no refinements to display
