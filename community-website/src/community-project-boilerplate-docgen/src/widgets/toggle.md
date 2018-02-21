---
title: Widgets - Toggle
layout: widget.pug
---

# Toggle

## Description

The toggle widget lets the user either:

* switch between two values for a single facetted attribute (`free_shipping / not_free_shipping`)
* toggle a faceted value on and off (only `canon` for brands)

This widget is particularly useful if you have a boolean value in the records.

## Options

| Props           | Type                            | Description
| -               | -                               | -
| `attribute`     | `string`                        | Name of the attribute for faceting (eg. “free_shipping”)
| `label`         | `string`                        | Human-readable name of the filter (eg. “Free Shipping”)
| `values`        | `{on?: boolean, off?: boolean}` | Value to filter on when unchecked. element (when using the default template). By default when switching to off, no refinement will be asked. So you will get both true and false results. If you set the off value to false then you will get only objects having false has a value for the selected attribute

## Code example

With single value:

```html
<ng-ais-toggle
  label="Free Shipping (toggle single value)"
  attribute="free_shipping"
>
</ng-ais-toggle>
```

With on & off values:

```html
<ng-ais-toggle
  label="Canon (not checked) or Sony (checked)"
  attribute="brand"
  [values]="{
    on: 'Sony',
    off: 'Canon'
  }"
>
</ng-ais-toggle>
```
