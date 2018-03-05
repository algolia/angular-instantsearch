---
title: Widgets - Infinite hits
layout: widget.pug
---

# Infinite Hits

## Description

Displays a list of hits.
You can use the directive `<ng-template></ng-template>` to customize the output.

## Options

| Attribures            | Type     | Description
| -                     | -        | -
| `showMoreLabel?`      | `string` | Label used on the show more button.

## Code example

```html
<ais-infinite-hits>
  <ng-template
    let-hits="hits"
    let-results="results"
  >
    <!-- No results message -->
    <div *ngIf="hits.length === 0">
      No results found matching <strong>{{results.query}}</strong>.
    </div>

    <!-- Hit template -->
    <div *ngFor="let hit of hits">
      <h1>
        <ais-highlight
          attribute="title"
          [hit]="hit"
        >
        </ais-highlight>
      </h1>

      <p>{{hit.description}}</p>
    </div>
  </ng-template>
</ais-infinite-hits>
```
