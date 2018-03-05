---
title: Guide - Highlighting results
layout: guide.pug
---

# Highlighting results

Search is all about helping users understand the results. This is especially true when using text based search. When a user types a query in the searchbox, the results must show why the results are matching the query. That’s why Algolia implements a powerful highlight that lets you display the matching parts of text attributes in the results.

This feature is already packaged for you in Angular InstantSearch.

## `<ais-highlight></ais-highlight>`

Highlighting is based on the results and you will need to make a custom Hit template in order to use the Highlighter. The [`<ais-highlight>`](widgets/highlight.html) directive takes two attributes:

* `attribute`: the path to the highlighted attribute
* `hit`: a single result object

Here is an example in which we define a custom Hit template for results that have a `description` field that is highlighted:

```html
<ais-hits>
    <ng-template let-hits="hits">
        <div *ngFor="let hit of hits">
            <ais-highlight
                attribute="description"
                [hit]="hit"
            >
            </ais-highlight>
        </div>
    </ng-template>
</ais-hits>
```
