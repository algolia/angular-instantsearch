---
title: Widgets - HierarchicalMenu
layout: widget.pug
canonical: https://www.algolia.com/doc/api-reference/widgets/hierarchical-menu/angular/
---

# Hierarchical Menu

## Description

The hierarchical menu widget is used to create a navigation based on a hierarchy of facet attributes.

It is commonly used for categories with subcategories.

## Options

| Attribute            | Type                | Description
| -                    | -                   | -
| `attributes`         | `string[]`          | Array of attributes to use to generate the hierarchy of the menu
| `limit?`             | `number`            | How much facet values to get
| `separator?`         | `string`            | Separator used in the attributes to separate level values
| `rootPath?`          | `string`            | Prefix path to use if the first level is not the root level
| `showParentLevel?`   | `boolean`           | Show the parent level of the current refined value
| `sortBy?`            | `string[]/Function` | How to sort facet values
| `autoHideContainer?` | `boolean`           | Hides the widget if there's no item to display
| `transformItems?`    | `(items) => items` | Function to modify the items being displayed, e.g. for filtering or sorting them

## Code example

```html
<ais-hierarchical-menu
  [showParentLevel]="false"
  [attributes]="[
    'hierarchicalCategories.lvl0',
    'hierarchicalCategories.lvl1',
    'hierarchicalCategories.lvl2'
  ]"
  [transformItems]="translate"
>
</ais-hierarchical-menu>
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
