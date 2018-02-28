---
title: Widgets - Highlight
layout: widget.pug
---

# Highlight

## Description

Renders any attribute from an hit into its highlighted form when relevant.

## Options

| Attributes  | Type     | Description
| -           | -        | -
| `attribute` | `string` | The location of the highlighted attribute in the hit
| `hit`       | `{}`     | The hit object containing the highlighted attribute
| `tagName?`  | `string` | The tag to be used for highlighted parts of the hit

## Code example

```html
<ng-ais-hits>
  <ng-template let-hits="hits">
    <div *ngFor="let hit of hits">
      Hit {{hit.objectID}}:
      <ng-ais-highlight attribute="name" [hit]="hit">
      </ng-ais-highlight>
    </div>
  </ng-template>
</ng-ais-hits>
```
