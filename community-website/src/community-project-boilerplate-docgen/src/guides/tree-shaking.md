---
title: Guide - Tree shaking
layout: guide.pug
canonical: https://www.algolia.com/doc/guides/building-search-ui/going-further/improve-performance/angular/
---

# Leveraging Tree-Shaking

Tree-shaking is a build step in which unused module exports are removed from the final bundle. To enable this behaviour refer to [ng build documentation](https://github.com/angular/angular-cli/wiki/build#bundling--tree-shaking).

In order for the tree shaking to work effectively with Angular InstantSearch, refrain from importing `NgAisModule`. Instead import the modules you need individually.

Don't do this:

```ts
import { NgAisModule } from 'angular-instantsearch';

@NgModule({
  imports: [NgAisModule.forRoot()],
})
export class AppModule {}
```

Do this instead:

```ts
import {
  NgAisInstantSearchModule,
  NgAisHitsModule,
  NgAisSearchBoxModule,
} from 'angular-instantsearch';

@NgModule({
  imports: [
    NgAisInstantSearchModule.forRoot(),
    NgAisHitsModule,
    NgAisSearchBoxModule,
  ],
})
export class AppModule {}
```
