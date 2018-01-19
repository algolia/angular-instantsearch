## `<ng-ais-numeric-menu />`

The NumericMenu is a component that displays a list of numeric filters in a list. Those numeric filters are pre-configured with creating the widget.

| Attributes      | Type                                                 | Description
| -               | -                                                | -
| `attributeName` | `string`                                         | Name of the numeric attribute to use
| `options`       | `{name: string, start?: number, end?: number}[]` | The list of indexes to search in
| `header?`       | `string`                                         | Displays text before widget
| `footer?`       | `string`                                         | Displays text after widget
| `autoHideContainer?` | `boolean`  | Hides the numeric menu if there's no item to display
