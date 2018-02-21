---
title: Widgets - Refinement List
layout: widget.pug
---

# Refinement List

## Description

The RefinementList component displays a list that let the end user choose multiple values for a specific facet.

## Options

| Attributes           | Type                     | Description
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

## Code example

```html
<ng-ais-refinement-list
  attribute="brand"
  operator="or"
  [limit]="10"
>
</ng-ais-refinement-list>
```
