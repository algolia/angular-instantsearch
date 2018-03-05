---
title: Widgets - ClearRefinements
layout: widget.pug
---

# Clear Refinements

## Description

The ClearRefinements widget displays a button that lets the user clean every refinement applied to the search.

## Options

| Attributes           | Type       | Description
| -                    | -          | -
| `clearsQuery?`       | `boolean`  | Pass true to also clear the search query
| `excludeAttributes?` | `string[]` | Every attributes that should not be removed on clears
| `autoHideContainer?` | `boolean`  | Hides the widget if there's no refinements to display

## Code example

```html
<ais-current-refinements></ais-current-refinements>
```
