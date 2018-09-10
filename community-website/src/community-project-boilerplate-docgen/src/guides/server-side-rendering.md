---
title: Guide - Server side rendering
layout: guide.pug
---

# Server Side Rendering

This is an advanced guide, if you never used Angular InstantSearch, you should follow the [getting-started](https://community.algolia.com/angular-instantsearch/getting-started.html) first.

You can find the result of this guide on the Angular InstantSearch [repository](https://github.com/algolia/angular-instantsearch/tree/master/examples/server-side-rendering).

Angular InstantSearch is compatible with server-side rendering with Angular version 5. We provide an API that is easy to use with [@angular/universal](https://github.com/angular/universal) modules.

For simplicity we are going to use the [@angular/universal-starter](https://github.com/angular/universal-starter) boilerplate which is a minimal Angular starter for Universal JavaScript using TypeScript and Webpack.

**Angular Universal is not working completely with version 6, you will need to checkout a specific commit of `universal-start` boilerplate.**

### How it works?

The server-side rendering uses two concepts from [@angular/universal](https://github.com/angular/universal) modules:

* [TransferState](https://angular.io/api/platform-browser/TransferState): Will cache the first request made to Algolia from your server in order to don't replicate it when the Angular application starts on the client side.
* [preboot](https://github.com/angular/preboot): Will avoid the first rendering of your Angular application on the client side and will it start from the HTML markup sent by the server.

In order to assemble all the pieces you will need to write some code in your own application and how you instantiate Angular InstantSearch. Let's dive into the code!

### Setup

First, clone the [@angular/universal-starter](https://github.com/angular/universal-starter) boilerplate:

```sh
> git clone git@github.com:angular/universal-starter.git [your-app-name]
> git reset --hard 02758f80501b18b9f49834e367136bd9590ccc04 # Angular 5
> cd [your-app-name]
> yarn
```

The next step is to install [preboot](https://github.com/angular/preboot) and [angular-instantsearch](https://github.com/algolia/angular-instantsearch) packages as well:

```sh
> yarn add preboot angular-instantsearch
```

Now you have all the requirements to start developing your universal Angular InstantSearch application!

### 1. Angular Universal modules

Once you installed the dependencies you will need to add the `TransferState`, `preboot` and `HttpClient` modules into `src/app/app.module.ts`:

```js
import {
  BrowserModule,
  BrowserTransferStateModule
} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";

import { PrebootModule } from 'preboot';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'my-app'}),
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full'},
      { path: 'lazy', loadChildren: './lazy/lazy.module#LazyModule'},
      { path: 'lazy/nested', loadChildren: './lazy/lazy.module#LazyModule'}
    ]),
    PrebootModule.withConfig({ appRoot: "app-root" }),
    BrowserTransferStateModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

We need also to import `ServerTransferStateModule` into `src/app/app.server.module.ts`:

```js

import { NgModule } from '@angular/core';
import {
  ServerModule,
  ServerTransferStateModule // THIS
} from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ServerTransferStateModule, // <- AND THIS
    ModuleMapLoaderModule,
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
```

And voilà, you have the requirements and your are now ready to plug Angular InstantSearch into your universal Angular application!

### 2. Transfer the search query to your server

In order to get the query of the client request into your Angular application you need to provide the original `request` object you receive into the express server. Open `./server.ts` and replace this block:

```js
app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));
```

By this one:

```js
app.engine('html', (_, options, callback) => {
  const engine = ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
    providers: [
      { provide: 'request', useFactory: () => options.req, deps: [] },
      provideModuleMap(LAZY_MODULE_MAP)
    ]
  });
  engine(_, options, callback);
});
```

Now on server-side rendering we can have access to the `request` object by using the [injector](https://angular.io/api/core/Injector). We will see how to do that in the next chapter.

### 3. Angular InstantSearch

First, you need to import the Angular InstantSearch module into your application like you will do in any Angular application. (If you don't know how to do this, please read the following part in the [getting started](/#import-module) guide).

The only difference is on how you configure `<ais-instantsearch>` component.

This will be our starting component. For simplicity you can re-use the Home component from the universal starter boilerplate:

```js
import { Component } from '@angular/core';

@Component({
  selector: 'home',
  template: `
    <ais-instantsearch [config]="instantSearchConfig">
    </ais-instantsearch>
  `
})
export class HomeComponent {
  public instantSearchConfig: {};

  constructor() {
    this.instantSearchConfig = {
      appId: "latency",
      apiKey: "6be0576ff61c053d5f9a3225e2a90f76",
      indexName: "bestbuy",
      urlSync: true
    }
  }
}
```

We will need to now import the `TransferState`, `HttpClient`, `Injector` and `PLATFORM_ID` into our constructor, let's update our component code:

```js
import { Component, Injector, Inject, PLATFORM_ID } from "@angular/core";
import { isPlatformServer } from "@angular/common";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { TransferState, makeStateKey } from "@angular/platform-browser";

@Component({
  selector: 'home',
  template: `
    <ais-instantsearch [config]="instantSearchConfig">
    </ais-instantsearch>
  `
})
export class HomeComponent {
  public instantSearchConfig: {};

  constructor(
    private httpClient: HttpClient,
    private transferState: TransferState,
    private injector: Injector,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.instantSearchConfig = {
      appId: "latency",
      apiKey: "6be0576ff61c053d5f9a3225e2a90f76",
      indexName: "bestbuy",
      urlSync: true
    }
  }
}
```

Final step is to update the `instantSearchConfig` with the modules we provide into `angular-instantsearch` in order to allow the Algolia API requests to be made on the server side:

```js
import {
  createSSRSearchClient,
  parseServerRequest
} from "angular-instantsearch";

[...]

constructor(
  private httpClient: HttpClient,
  private transferState: TransferState,
  private injector: Injector,
  @Inject(PLATFORM_ID) private platformId: Object
) {
  const req = isPlatformServer(this.platformId)
    ? this.injector.get("request")
    : undefined;

  const searchParameters = parseServerRequest(req);

  this.instantSearchConfig = {
    searchParameters,
    indexName: "bestbuy",
    urlSync: true,
    createAlgoliaClient: createSSRSearchClient({
      makeStateKey,
      HttpHeaders,
      transferState: this.transferState,
      httpClient: this.httpClient,
      appId: "latency",
      apiKey: "6be0576ff61c053d5f9a3225e2a90f76"
    })
  };
}
```

**You cannot use `routing: true` option instead of `urlSync: true` yet, there is an issue with Preboot that will randomly render a blank page**

### 4. Wrapping up

Congratulations! You can now add more Angular InstantSearch [widgets](https://algolia.gitbooks.io/angular-instantsearch/#display-results) on your search page component and run:

```sh
> npm run build:ssr && npm run serve:ssr
> open http://localhost:4000
```

You have now fully universal Angular InstantSearch application running on your server and browser! If you want to run directly the application we provide a complete example that you can find on the [angular-instantsearch](https://github.com/algolia/angular-instantsearch/tree/master/examples/server-side-rendering) GitHub repository.
