---
title: Widgets - Sort By
layout: widget.pug
---

# Sort by

## Description

The SortBy component displays a list of indexes allowing a user to change the hits are sorting.

## Options

| Attributes  | Type                              | Description
| -           | -                                 | -
| `items`     | `{name: string, label: string}[]` | The list of indexes to search in

## Code example

```html
<ng-ais-sort-by
  [items]="[
    { name: 'instant_search', label: 'Most relevant' },
    { name: 'instant_search_price_asc', label: 'Lowest price' },
    { name: 'instant_search_price_desc', label: 'Highest price' }
  ]"
>
</ng-ais-sort-by>
```
