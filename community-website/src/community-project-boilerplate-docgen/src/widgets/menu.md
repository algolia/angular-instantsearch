---
title: Widgets - Menu
layout: widget.pug
canonical: https://www.algolia.com/doc/api-reference/widgets/menu/angular/
---

# Menu

## Description

The Menu component displays a menu that lets the user choose a single value for a specific attribute.

## Options

| Attribute            | Type                  | Description
| -                    | -                     | -
| `attribute`          | `string`              | Name of the attribute for faceting (eg. "free_shipping")
| `limit?`             | `number`              | How many facets values to retrieve
| `showMoreLimit?`     | `number`              | Bigger than `limit` if the component should display a button that will expand the number of items
| `showMoreLabel?`     | `string`              | Label of the show more button
| `showLessLabel?`     | `string`              | Label of the show less button
| `sortBy?`            | `string[] / Function` | How to sort facet values
| `autoHideContainer?` | `boolean`             | Hides the menu if there's no item to display
| `transformItems?`    | `(items) => items`    | Function to modify the items being displayed, e.g. for filtering or sorting them

## Code example

```html
<ais-menu
  attribute="categories"
  [limit]="3"
  [showMoreLimit]="10"
  [transformItems]="translate"
>
</ais-menu>
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
