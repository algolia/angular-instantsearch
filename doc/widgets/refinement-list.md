## `<ng-ais-refinement-list />`

The RefinementList component displays a list that let the end user choose multiple values for a specific facet.

| Attributes           | Type                     | Description
| -                    | -                        | -
| `attributeName`      | `string`                 | Name of the attribute for faceting (eg. "categories")
| `operator?`          | `"and" / "or"`           | How to apply the refinements
| `limitMin?`          | `number`                 | How much facet values to get
| `limitMax?`          | `number`                 | Bigger than `limit` if the component should display a button that will expand the number of items
| `showMoreLabel?`     | `string`                 | Label of the show more button
| `showLessLabel?`     | `string`                 | Label of the show less button
| `withSearchBox?`     | `boolean`                | True if the component should display an input to search for facet values
| `searchPlaceholder?` | `string`                 | The label of the search input placeholder
| `sortBy?`            | `string[] / Function`    | How to sort facet values
| `autoHideContainer?` | `boolean`                | Hides the refinement list if there's no item to display
