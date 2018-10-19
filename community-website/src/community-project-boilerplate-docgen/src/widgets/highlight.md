---
title: Widgets - Highlight
layout: widget.pug
---

# Highlight

## Description

Renders any attribute from an hit into its highlighted form when relevant.

## Options

| Attribute   | Type     | Description
| -           | -        | -
| `attribute` | `string` | The location of the highlighted attribute in the hit
| `hit`       | `{}`     | The hit object containing the highlighted attribute
| `tagName?`  | `string` | The tag to be used for highlighted parts of the hit

## Code example

```html
<ais-hits>
  <ng-template let-hits="hits">
    <div *ngFor="let hit of hits">
      Hit {{hit.objectID}}:
      <ais-highlight attribute="name" [hit]="hit">
      </ais-highlight>
    </div>
  </ng-template>
</ais-hits>
```
