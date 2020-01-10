---
title: Widgets - Rating Menu
layout: widget.pug
canonical: https://www.algolia.com/doc/api-reference/widgets/rating-menu/angular/
---

# Rating Menu

## Description

RatingMenu is used for displaying grade like filters. The values are normalized within boundaries.

## Options

| Attribute            | Type       | Description
| -                    | -          | -
| `attribute`          | `string`   | Name of the attribute for faceting
| `andUpLabel?`        | `string`   | Label to display after the stars
| `max?`               | `number`   | The maximum rating value
| `autoHideContainer?` | `boolean`  | Hides the rating menu if there's no item to display

## Code example

```html
<ais-rating-menu
  attribute="rating"
  [max]="5"
>
</ais-rating-menu>
```
