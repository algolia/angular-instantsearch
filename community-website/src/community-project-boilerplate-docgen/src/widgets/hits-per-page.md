---
title: Widgets - Hits Per Page
layout: widget.pug
---

# Hits per page

## Description

The Hits per page widget displays a dropdown menu to let the user change the number of displayed hits.

## Options

| Attribute      | Type                                                  | Description
| -              | -                                                     | -
| `items`        | `{value: number, label: string, default?: boolean}[]` | List of available options
| `autoHideContainer?` | `boolean`  | Hides the results per pages if there's no item to display

## Code example

```html
<ais-hits-per-page
  [items]="[
    { value: 3, label: '3 per page' },
    { value: 5, label: '5 per page' },
    { value: 10, label: '10 per page' }
  ]"
>
</ais-hits-per-page>
```
