---
title: Widgets - Stats
layout: widget.pug
---

# Stats

## Description

The Stats component displays the total number of matching hits and the time it took to get them (time spent in the Algolia server).

## Code example

You can use the directive `<ng-template></ng-template>` to customize the output:

```js
@Component({
  selector: 'my-app',
  template: `
    <ais-stats>
      <ng-template let-state="state">
        {{state.nbHits}} results found in {{stats.processingTimeMS}}ms.
      </ng-template>
    </ais-stats>
  `
})
export class AppComponent {}
```

The `state` object contains:

* `hitsPerPage` The maximum number of hits per page returned by Algolia
* `nbHits` The number of hits in the result set
* `nbPages` The number of pages computed for the result set.
* `page` The current page.
* `processingTimeMS` The time taken to compute the results inside the Algolia engine.
* `query` The query used for the current search.
