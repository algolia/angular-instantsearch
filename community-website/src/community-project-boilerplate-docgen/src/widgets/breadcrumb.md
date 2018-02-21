---
title: Widgets - Breadcrumb
layout: widget.pug
---

# Breadcrumb

## Description

A breadcrumb is a secondary navigation scheme that allows the user to see where the current page is in relation to the website or web application’s hierarchy. In terms of usability, using a breadcrumb reduces the number of actions a visitor needs to take in order to get to a higher-level page.

## Options

| Attribute            | Type       | Description
| -                    | -          | -
| `attributes`         | `string[]` | Array of attributes to use to craft the Breadcrumb
| `rootPath?`          | `string`   | Prefix path to use if the first level is not the root level
| `autoHideContainer?` | `boolean`  | Hides the breadcrumb if there's no item to display

## Code example

```html
<ng-ais-breadcrumb
  [attributes]="[
    'hierarchicalCategories.lvl0',
    'hierarchicalCategories.lvl1',
    'hierarchicalCategories.lvl2'
  ]"
>
</ng-ais-breadcrumb>
```
