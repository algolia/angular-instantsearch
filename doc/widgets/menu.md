## `<ng-ais-menu />`

The Menu component displays a menu that lets the user choose a single value for a specific attribute.


| Attributes           | Type                  | Description
| -                    | -                     | -
| `attributeName`      | `string`              | Name of the attribute for faceting (eg. "free_shipping")
| `limitMin?`          | `number`              | How many facets values to retrieve
| `limitMax?`          | `number`              | Bigger than `limit` if the component should display a button that will expand the number of items
| `showMoreLabel?`     | `string`              | Label of the show more button
| `showLessLabel?`     | `string`              | Label of the show less button
| `sortBy?`            | `string[] / Function` | How to sort facet values
| `autoHideContainer?` | `boolean`             | Hides the menu if there's no item to display
