---
title: Widgets - Range Input
layout: widget.pug
---

# Range Input

## Description

Numeric range widget allows a user to select a numeric range using a minimum and maximum input.

## Options

| Attribute        | Type       | Description
| -                | -          | -
| `attribute`      | `string`   | Name of the attribute for faceting
| `min?`           | `number`   | Minimal value, default to automatically computed
| `max?`           | `number`   | Maximal value, default to automatically computed
| `precision?`     | `number`   | Number of digits after decimal point to use

## Code example

```html
<ais-range-input
  attribute="price"
  [min]="10"
  [max]="10"
  [precision]="2"
>
</ais-range-input>
```
