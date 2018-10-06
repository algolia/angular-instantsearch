---
title: Widgets - Numeric Menu
layout: widget.pug
---

# Numeric Menu

## Description

The Numeric Menu is a component that displays a list of numeric filters in a list. Those numeric filters are pre-configured with creating the widget.

## Options

| Attribute            | Type                                             | Description
| -                    | -                                                | -
| `attribute         ` | `string`                                         | Name of the numeric attribute to use
| `items`              | `{name: string, start?: number, end?: number}[]` | The list of indexes to search in
| `autoHideContainer?` | `boolean`  | Hides the numeric menu if there's no item to display

## Code example

```html
<ais-numeric-menu
  attribute="price"
  operator="or"
  [items]="[
    { name: 'All' },
    { end: 4, name: 'less than 4' },
    { start: 4, end: 4, name: '4' },
    { start: 5, end: 10, name: 'between 5 and 10' },
    { start: 10, name: 'more than 10' }
  ]"
>
</ais-numeric-menu>
```
