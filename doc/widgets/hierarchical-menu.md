## `<ng-ais-hierarchical-menu />`

The hierarchical menu widget is used to create a navigation based on a hierarchy of facet attributes.

It is commonly used for categories with subcategories.

| Attributes           | Type                | Description
| -                    | -                   | -
| `attributes`         | `string[]`          | Array of attributes to use to generate the hierarchy of the menu
| `limit?`             | `number`            | How much facet values to get
| `separator?`         | `string`            | Separator used in the attributes to separate level values
| `rootPath?`          | `string`            | Prefix path to use if the first level is not the root level
| `showParentLevel?`   | `boolean`           | Show the parent level of the current refined value
| `sortBy?`            | `string[]/Function` | How to sort facet values
| `autoHideContainer?` | `boolean`           | Hides the widget if there's no item to display
