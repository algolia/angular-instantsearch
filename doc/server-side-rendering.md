## Server Side Rendering

Angular InstantSearch is compatible with server-side rendering starting with Angular version 5. We provide an API that is easy to use with [@angular/universal](https://github.com/angular/universal) modules.

For simplicity we are going to use the [@angular/universal-starter](https://github.com/angular/universal-starter) boilerplate which is a minimal Angular starter for Universal JavaScript using TypeScript and Webpack.

### How it works?

The server-side rendering uses two concepts from [@angular/universal](https://github.com/angular/universal) modules:

* [TransferState](https://angular.io/api/platform-browser/TransferState): Will cache the first request made to Algolia from your server in order to don't replicate it when the Angular application starts on the client side.
* [preboot](https://github.com/angular/preboot): Will avoid the first rendering of your Angular application on the client side and will it start from the HTML markup sent by the server.

In order to assemble all the pieces you will need to write some code in your own application and how you instantiate Angular InstantSearch. Let's dive into the code!

### Setup

First, clone the [@angular/universal-starter](https://github.com/angular/universal-starter) boilerplate:

```sh
> git clone git@github.com:angular/universal-starter.git [your-app-name]
> cd [your-app-name]
> yarn # OR
> npm install
```

The next step is to install [preboot](https://github.com/angular/preboot) and [angular-instantsearch](https://github.com/algolia/angular-instantsearch) packages as well:

```sh
> yarn add preboot angular-instantsearch # OR
> npm install preboot angular-instantsearch --save
```

Now you have all the requirements to start developing your universal Angular InstantSearch application!

### 1. Angular Universal modules

Once you installed the dependencies you will need to add the `TransferState` and `preboot` modules into your application:

This is pretty straightforward to do, first open `src/app/app.module.ts` and add `preboot`:

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrebootModule } from 'preboot'; // <- THIS

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
    PrebootModule.withConfig({ appRoot: "app-root" }) // <- AND THIS
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

And that's it for `preboot` 🎉

Now for `TransferState`, still into `src/app/app.module.ts` you need to import the `BrowserTransferStateModule` module:

```ts
import {
  BrowserModule,
  BrowserTransferStateModule // <- THIS
} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

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
    BrowserTransferStateModule // <- AND THIS
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Since we are here, let's also include the `HttpClientModule` which will be used for later:

```ts
import {
  BrowserModule,
  BrowserTransferStateModule
} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from "@angular/common/http"; // <- THIS

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
    HttpClientModule // <- AND THIS
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

We need also to import `ServerTransferStateModule` into `src/app/app.server.module.ts`:

```ts

import { NgModule } from '@angular/core';
import {
  ServerModule,
  ServerTransferStateModule
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

### 2. Provide the original `request` from express

In order to get the query of the client request into your Angular application you need to provide the original `request` object you receive into the express server. Open `./server.ts` and replace this block:

```ts
app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));
```

With:

```ts
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

First, you need to import the Angular InstantSearch module into your application like you will do in any Angular application. (If you don't know how to do this, please read the [getting started](/) guide).

The only difference is on how you configure `<ng-ais-instantsearch>` component.

This will be our starting component:

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-search-page',
  template: `
    <ng-ais-instantsearch [config]="instantSearchConfig">
    </ng-ais-instantsearch>
  `
})
export class SearchPageComponent {
  public instantSearchConfig: {};

  constructor() {
    this.instantSearchConfig = {
      appId: "latency",
      apiKey: "6be0576ff61c053d5f9a3225e2a90f76",
      indexName: "ikea",
      urlSync: true
    }
  }
}
```

We will need to now import the `TransferState`, `HttpClient`, `Injector` and `PLATFORM_ID` into our constructor:

```ts
import { Component, Injector, Inject, PLATFORM_ID } from "@angular/core";
import { isPlatformServer } from "@angular/common";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { TransferState, makeStateKey } from "@angular/platform-browser";

@Component({
  selector: 'app-search-page',
  template: `
    <ng-ais-instantsearch [config]="instantSearchConfig">
    </ng-ais-instantsearch>
  `
})
export class SearchPageComponent {
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
      indexName: "ikea",
      urlSync: true
    }
  }
}
```

Final step is to update the `instantSearchConfig` with the modules we provide into `angular-instantsearch` in order to allow the Algolia API requests to be made on the server side:

```ts
import {
  createSSRAlgoliaClient,
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

  this.instantsearchConfig = {
    searchParameters,
    appId: "latency",
    apiKey: "6be0576ff61c053d5f9a3225e2a90f76",
    indexName: "ikea",
    urlSync: true,
    createAlgoliaClient: createSSRAlgoliaClient({
      makeStateKey,
      HttpHeaders,
      transferState: this.transferState,
      httpClient: this.httpClient
    })
  };
}
```

### 4. Wrapping up

Congratulations! You can now add more Angular InstantSearch widgets on your search page component and run:

```sh
> npm run build:ssr && npm run serve:ssr
> open http://localhost:4000
```

You have now fully universal Angular InstantSearch application running on your server and browser! If you feel lazy, we provide a complete example that you can run on the [angular-instantsearch](https://github.com/algolia/angular-instantsearch/tree/master/examples/server-side-rendering) GitHub repository.
