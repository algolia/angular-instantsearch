# Welcome to Angular-InstantSearch

Angular-InstantSearch is an Angular 4 TypeScript library that lets you create an instant search results experience using Algolia's REST API.

In this tutorial you'll learn how to:

* Install and use `angular-instantsearch` in your angular application
* Display results from Algolia
* Add widgets / components to filter the results

## Before we start

Angular-InstantSearch is meant to be used with Algolia.

Therefore, you'll need the credentials to an Algolia index. To ease this getting started, here are credentials to an already configured index:

* `appId: latency`
* `searchKey: 3d9875e51fbd20c7754e65422f7ce5e1`
* `indexName: bestbuy`

It contains sample data for an e-commerce website.

This guide also expects you to have a working angular application. You can also use the official [angular CLI](http://cli.angular.io) to bootstrap a new application this way:

```
> npm install -g @angular/cli
> ng new example-angular-instantsearch
> cd example-angular-instantsearch
> ng serve
```

## Install Angular-InstantSearch

First install `angular-instantsearch` via npm:

* `$ yarn add angular-instantsearch` OR
* `$ npm install --save angular-instantsearch`

## Import module

Once installed you need to import our main module into your Angular application:

```ts
import { NgAisModule } from 'angular-instantsearch';
```

The only remaining part is to list the imported module in your root module and in any additional application modules that make use of `angular-instantsearch`.

The exact method will be slightly different the root (top-level) module because you need to call `.forRoot()` static method from the `angular-instantsearch` main module.

* For your application root module:

```ts
import { NgAisModule } from 'angular-instantsearch';

@NgModule({
  declarations: [AppComponent, ...],
  imports: [NgAisModule.forRoot(), ...],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

* Other modules in your application can simply import `NgAisModule`:

```ts
import { NgAisModule } from 'angular-instantsearch';

@NgModule({
  declarations: [OtherComponent, ...],
  imports: [NgAisModule, ...]
})
export class OtherModule {}
```

You also need load the companion CSS file. You can load it by adding an entry into your `styleUrls` on the correspondent component:

```ts
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: [
    "../../node_modules/angular-instantsearch/bundles/instantsearch.min.css"
  ]
})
```

We also provide a default theme to have widgets effectively styled, you can import it this way:

```ts
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: [
    "../../node_modules/angular-instantsearch/bundles/instantsearch.min.css",
    "../../node_modules/angular-instantsearch/bundles/instantsearch-theme-algolia.min.css"
  ]
})
```

## Initialization

Now that you have imported Angular-InstantSearch module into your application, you can use any widgets with their respective directive.

`<ng-ais-instantsearch>` is the component that will connect to Algolia and will synchronize all the widgets togethers. It has to be the root component of every other widgets you will import.

```ts
@Component({
  selector: 'my-app',
  template: `
    <ng-ais-instantsearch
      [config]="{
        apiKey: '6be0576ff61c053d5f9a3225e2a90f76',
        appId: 'latency',
        indexName: 'instant_search',
        urlSync: true
      }"
    >
      <!-- Search Widgets will go there -->
    </ng-ais-instantsearch>
  `
})
export class AppComponent {}
```

`appId`, `apiKey` and `indexName` are mandatory keys of the config. Those are the credentials of your application in Algolia. They can be found in your [Algolia dashboard](https://www.algolia.com/api-keys).

You can synchronise the current search with the browser url. It provides two benefits:

* Working back/next browser buttons
* Copy and share the current search url

To configure this feature, pass `urlSync: true` option.
The `urlSync` option has more parameters (see [`<ng-ais-instantsearch />`](/widgets/instantsearch.md)).

Congrats! Your application is now connected to Algolia 🚀

## Display results

The core of a search experience is to display results. By default, Angular-InstantSearch will do a query at the start of the page and will retrieve the most relevant hits.

To display results, the hits widget will be used. This widget will display all the results returned by Algolia, and it will update when there are new results.

Let's add into our main application template the Hits widget:

```html
<ng-ais-instantsearch
  [config]="{
    apiKey: '6be0576ff61c053d5f9a3225e2a90f76',
    appId: 'latency',
    indexName: 'instant_search',
    urlSync: true
  }"
>
  <ng-ais-hits></ng-ais-hits>
</ng-ais-instantsearch>
```

You should now be able to see the results without any styling. This view lets you inspect the values that are retrieved from Algolia, in order to build your custom view.

In order to customize the view for each product we can use the `<ng-template>` directive as a child of `<ng-ais-hits>` block.

```html
<ng-ais-hits>
  <ng-template let-hits="hits">
    <div *ngFor="let hit of hits">
      Hit {{hit.objectID}}: {{hit.name}}
    </div>
  </ng-template>
</ng-ais-hits>
```

One very important aspect of the search is highlightning the matching parts of the results. We can use the `<ng-ais-highlight>` widget to do that for you:

```html
<ng-ais-hits>
  <ng-template let-hits="hits">
    <div *ngFor="let hit of hits">
      Hit {{hit.objectID}}:
      <ng-ais-highlight attributeName="name" [hit]="hit">
      </ng-ais-highlight>
    </div>
  </ng-template>
</ng-ais-hits>
```

In this section we’ve seen:

* How to add widgets into your application template
* How to display the results from Algolia
* How to customize the display of those results
* How to leverage highlighting in results

## Add a SearchBox

Now that we’ve added the results, we can start querying our index. To do this, we are going to use the Searchbox widget. Let’s add it in the application template:

```html
<ng-ais-instantsearch [config]="{...}">
  <!-- SearchBox -->
  <ng-ais-searchbox></ng-ais-searchbox>

  <!-- Hits -->
  <ng-ais-hits></ng-ais-hits>
</ng-ais-instantsearch>
```

The search is now interactive and we see what matched in each of the products. Good thing for us, Algolia computes the matching part. For better control over what kind of data is returned, you should configure the [attributeToRetrieve](https://www.algolia.com/doc/rest#param-attributesToRetrieve) and [attributeToHighlight](https://www.algolia.com/doc/rest#param-attributesToHighlight) of your index

In this part, we’ve seen:

* How to use the searchbox to query Algolia with text

## Add a RefinementList

While the SearchBox is the way to go when it comes to textual search, you may also want to provide filters based on the structure of the records.

Algolia provides a set of parameters for filtering by facets, numbers or geo location. Angular-InstantSearch packages those into a set of widgets.

Since the dataset used here is an e-commerce one, let’s add a [RefinementList](/widgets/refinement-list.md) to filter the products by categories:

```html
<ng-ais-instantsearch [config]="{...}">
  <!-- SearchBox -->
  <ng-ais-searchbox></ng-ais-searchbox>

  <!-- RefinementList -->
  <ng-ais-refinement-list attributeName="category"></ng-ais-refinement-list>

  <!-- Hits -->
  <ng-ais-hits></ng-ais-hits>
</ng-ais-instantsearch>
```

The `attributeName` option specifies the faceted attribute to use in this widget. This attribute should be declared as a facet in the index configuration as well.

The values displayed are computed by Algolia from the results.

In this part, we’ve seen that:

* There are components for different types of filters
* The RefinementList works with facets
* Facets are computed from the results

## Going further

We now miss two elements in our search interface:

* The ability to browse beyond the first page of results
* The ability to reset the filters

Those two features are implemented respectively with the [Pagination](/widgets/pagination.md), [ClearAll](/widgets/clear-all.md) and [CurrentRefinedValues](/widgets/current-refined-values.md) widgets. They all have nice defaults which means that we can use them directly without further configuration.

```html
<ng-ais-instantsearch [config]="{...}">
  <!-- SearchBox -->
  <ng-ais-searchbox></ng-ais-searchbox>

  <!-- RefinementList -->
  <ng-ais-refinement-list attributeName="category">
  </ng-ais-refinement-list>

  <!-- CurrentRefinedValues -->
  <ng-ais-current-refined-values [clearAll]="false">
    <!--
      This widget can also contain a clear all link to remove all filters,
      we disable it in this example since we use `clearAll` widget on its own.
    -->
  </ng-ais-current-refined-values>

  <!-- ClearAll -->
  <ng-ais-clear-all clearAllLabel="Reset everything">
  </ng-ais-clear-all>

  <!-- Hits -->
  <ng-ais-hits></ng-ais-hits>

  <!-- Pagination -->
  <ng-ais-pagination [maxPages]="20">
  </ng-ais-pagination>
</ng-ais-instantsearch>
```

Current filters will display all the filters currently selected by the user. This gives the user a synthetic way of understanding the current search. ClearAll displays a button to remove all the filters.

In this part, we’ve seen:

* How to clear the filters
* How to paginate the results

## Wrapping up

Congratulations, you now have a fully featured InstantSearch result page. But this is only the beginning! If you want to dig further into Angular-InstantSearch, we suggest reading the other guides and the widgets API.
