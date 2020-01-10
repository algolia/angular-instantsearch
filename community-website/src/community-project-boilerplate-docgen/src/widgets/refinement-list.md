---
title: Widgets - Refinement List
layout: widget.pug
canonical: https://www.algolia.com/doc/api-reference/widgets/refinement-list/angular/
---

# Refinement List

## Description

The RefinementList component displays a list that let the end user choose multiple values for a specific facet.

## Options

| Attribute            | Type                     | Description
| -                    | -                        | -
| `attribute`          | `string`                 | Name of the attribute for faceting (eg. "categories")
| `operator?`          | `"and" / "or"`           | How to apply the refinements
| `limit?`             | `number`                 | How much facet values to get
| `showMoreLimit?`     | `number`                 | Bigger than `limit` if the component should display a button that will expand the number of items
| `showMoreLabel?`     | `string`                 | Label of the show more button
| `showLessLabel?`     | `string`                 | Label of the show less button
| `searchable?`        | `boolean`                | True if the component should display an input to search for facet values
| `searchPlaceholder?` | `string`                 | The label of the search input placeholder
| `sortBy?`            | `string[] / Function`    | How to sort facet values
| `autoHideContainer?` | `boolean`                | Hides the refinement list if there's no item to display
| `transformItems?`    | `(items) => items`       | Function to modify the items being displayed, e.g. for filtering or sorting them

## Code example

```html
<ais-refinement-list
  attribute="brand"
  operator="or"
  [limit]="10"
  [transformItems]="translate"
>
</ais-refinement-list>
```
```ts
export class AppComponent {
  // ...
  translate(items) {
    return items.map(item => ({
      ...item,
      highlighted: myTranslateFunc(item.highlighted)
    }));
  }
}
```
