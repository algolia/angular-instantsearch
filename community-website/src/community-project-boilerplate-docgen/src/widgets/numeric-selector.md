---
title: Widgets - Numeric Selector
layout: widget.pug
---

# Numeric Selector

## Description

The Numeric Selector component lets the user choose between numerical refinements from a dropdown menu.

## Options

| Attributes  | Type                                   | Description
| -           | -                                      | -
| `attribute` | `string`                               | Name of the numeric attribute to use
| `items`     | `{value: number, label: string}[]`     | The list of indexes to search in
| `operator?  | `"<" / "<=" / "=" / ">=" / ">" / "!="` | The operator to use to refine

## Code example

```html
<ng-ais-numeric-selector
  attribute="rating"
  operator="="
  [items]="[
    { label: 'No rating selected', value: undefined },
    { label: 'Rating: 5', value: 5 },
    { label: 'Rating: 4', value: 4 },
    { label: 'Rating: 3', value: 3 },
    { label: 'Rating: 2', value: 2 },
    { label: 'Rating: 1', value: 1 }
  ]"
>
</ng-ais-numeric-selector>
```
