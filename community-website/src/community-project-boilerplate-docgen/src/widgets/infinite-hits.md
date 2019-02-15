---
title: Widgets - Infinite hits
layout: widget.pug
canonical: https://www.algolia.com/doc/api-reference/widgets/infinite-hits/angular/
---

# Infinite Hits

## Description

Displays a list of hits.
You can use the directive `<ng-template></ng-template>` to customize the output.

## Options

| Attribute             | Type               | Description
| -                     | -                  | -
| `showMoreLabel?`      | `string`           | Label used on the show more button.
| `transformItems?`     | `(items) => items` | Function to modify the items being displayed, e.g. for filtering or sorting them

## Code example

```html
<ais-infinite-hits>
  <ng-template
    let-hits="hits"
    let-results="results"
    let-refine="showMore"
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

    <!-- Show more button template -->
    <button (click)="refine($event)">
      Show more
    </button>
  </ng-template>
</ais-infinite-hits>
```
