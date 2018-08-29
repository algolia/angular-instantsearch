---
title: Widgets - Hits
layout: widget.pug
---

# Hits

## Description

Displays a list of hits.
You can use the directive `<ng-template></ng-template>` to customize.

## Options

| Attributes        | Type               | Description
| -                 | -                  | -
| `transformItems?` | `(items) => items` | Function to modify the items being displayed, e.g. for filtering or sorting them. Takes the items as parameter and expects them back in return.

## Code example

```html
<ais-hits>
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
</ais-hits>
```
