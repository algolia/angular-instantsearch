---
title: Widgets - ClearRefinements
layout: widget.pug
canonical: https://www.algolia.com/doc/api-reference/widgets/clear-refinements/angular/
---

# Clear Refinements

## Description

The ClearRefinements widget displays a button that lets the user clean every refinement applied to the search.

## Options

| Attribute            | Type       | Description
| -                    | -          | -
| `clearsQuery?`       | `boolean`  | Pass true to also clear the search query
| `excludeAttributes?` | `string[]` | Every attributes that should not be removed on clears
| `autoHideContainer?` | `boolean`  | Hides the widget if there's no refinements to display

## Code example

```html
<ais-clear-refinements></ais-clear-refinements>
```
