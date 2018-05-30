---
title: Guide - Migrate from v1
layout: guide.pug
---

# Angular 2 and 4 support drop

In order to support Angular CLI 6 we had to drop the support for older versions, the only supported versions are now: v5 and v6.
You can update your Angular 4 application pretty easily by following this guide: [https://update.angular.io/](https://update.angular.io/).

If you are using Angular v6 you will need an extra step, polyfill `process.env` by adding in your `src/polyfill.ts`:

```js
(window as any).process = {env: {}};
```

# Widget prefix

The `ng-` prefix is considered reserverd for core implementations into Angular so we dropped it.
All the widgets are now only starting with `ais-`:

```html
<ais-instantsearch [config]="{...}">
  <ais-hits>
    <ng-template let-hits="hits">
      <div *ngFor="let hit of hits">
        Hit {{hit.objectID}}:
        <ais-highlight attribute="name" [hit]="hit">
        </ais-highlight>
      </div>
    </ng-template>
  </ais-hits>
</ais-instantsearch>
```

# Server side rendering

* The `createSSRAlgoliaClient` util has been renamed to `createSSRSearchClient`
* You cannot use the new `routing: true` option on `<ais-instantsearch>` widget until resolution of [preboot#82](https://github.com/angular/preboot/issues/82)
