# Welcome to Angular InstantSearch

Angular InstantSearch is an **Angular 4 and 5** TypeScript library that lets you create an instant search results experience using Algolia's REST API.

In this tutorial you'll learn how to:

* Install and use `angular-instantsearch` in your angular application
* Display results from Algolia
* Add widgets / components to filter the results

## Beta feedback

This project is currently in **beta**, we welcome any feedback via [GitHub issues](https://github.com/algolia/angular-instantsearch/issues/new) and there's also a dedicated chat available at [gitter.im/angular-instantsearch](https://gitter.im/angular-instantsearch).

During the beta, we will do substantial changes based on your feedback. For all of those changes, we will warn
every users via our chat, discourse and GitHub releases.

## Before we start

Angular InstantSearch is meant to be used with Algolia.

Therefore, you'll need the credentials to an Algolia index. To ease this getting started, here are credentials to an already configured index:

* `appId: latency`
* `searchKey: 3d9875e51fbd20c7754e65422f7ce5e1`
* `indexName: bestbuy`

It contains sample data for an e-commerce website.

This guide also expects you to have a working angular application. You can use the official [angular CLI](http://cli.angular.io) to bootstrap a new application this way:

```sh
npm install -g @angular/cli
ng new example-angular-instantsearch
cd example-angular-instantsearch
ng serve
```

Then go on <http://localhost:4200/> to see your live example.

## Install Angular InstantSearch

First install `angular-instantsearch` via npm:

* `$ yarn add angular-instantsearch` OR
* `$ npm install --save angular-instantsearch`

## Import module

Once installed you need to import our main module into your Angular application,
so for example if you generated an app with the Angular cli, it would be in `src/app/app.module.ts`:

```ts
import { NgAisModule } from 'angular-instantsearch';
```

We then need to inject the Angular InstantSearch module into the imports of our app.

This can be done either at the root level ( `src/app/app.module.ts`) or in any search module you might have.
When done at the root level of your app, the syntax is a bit different.

* At the root module:

```ts
import { NgAisModule } from 'angular-instantsearch';

@NgModule({
  declarations: [AppComponent, ...],
  imports: [NgAisModule.forRoot(), ...], // use .forRoot()
  bootstrap: [AppComponent]
})
export class AppModule {}
```

* In another module, like a search module:

```ts
import { NgAisModule } from 'angular-instantsearch';

@NgModule({
  declarations: [OtherComponent, ...],
  imports: [NgAisModule, ...]
})
export class OtherModule {}
```

You also need load the companion CSS files. To do so, you need to add the relevant CSS files to
your `.angular-cli.json` file, in the `apps > styles` array:

```json
{
  "styles": [
    "../node_modules/angular-instantsearch/bundles/instantsearch.min.css",
    "../node_modules/angular-instantsearch/bundles/instantsearch-theme-algolia.min.css",
    "styles.css"
  ]
}
```

And then kill and reload (`ng serve`) your server.

## Initialization

Now that you have imported Angular InstantSearch module into your application, you can use any widgets with their respective directive.

`<ng-ais-instantsearch>` is the component that will connect to Algolia and will synchronize all the widgets togethers. It has to be the root component of every other widgets you will import.

If you used Angular cli, then you can change the content of `src/app/app.component.html` to:

```html
<h1>My first search app</h1>
<ng-ais-instantsearch
  [config]="{
    apiKey: '6be0576ff61c053d5f9a3225e2a90f76',
    appId: 'latency',
    indexName: 'instant_search'
  }"
>
  <!-- Search Widgets will go there -->
</ng-ais-instantsearch>
```

Congrats! Your application is now connected to Algolia 🚀... But it does not display anything for now,
let's add more widgets!

## Display results

The core of a search experience is to display results. By default, Angular InstantSearch will do a query at the start of the page and will retrieve the most relevant hits.

To display results, let's add the Results widget. This widget will display all the results returned by Algolia, and it will update when there are new results:

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

Here's the result:
![First hits](./first-hits.png)

You should now be able to see the results, now let's try to use a custom template for hits,
replace `<ng-ais-hits></ng-ais-hits>` with:

```html
<!-- <ng-ais-instantsearch [config]="{...}"> -->
  <ng-ais-hits>
    <ng-template let-hits="hits">
      <div *ngFor="let hit of hits">
        Hit {{hit.objectID}}: {{hit.name}}
      </div>
    </ng-template>
  </ng-ais-hits>
<!-- </ng-ais-instantsearch> -->
```

One very important aspect of the search is highlightning the matching parts of the results. We can use the `<ng-ais-highlight>` widget to do that for you:

```html
<!-- <ng-ais-instantsearch [config]="{...}"> -->
  <ng-ais-hits>
    <ng-template let-hits="hits">
      <div *ngFor="let hit of hits">
        Hit {{hit.objectID}}:
        <ng-ais-highlight attributeName="name" [hit]="hit">
        </ng-ais-highlight>
      </div>
    </ng-template>
  </ng-ais-hits>
<!-- </ng-ais-instantsearch> -->
```

In this section we’ve seen:

* How to add widgets into your application template
* How to display the results from Algolia
* How to customize the display of those results
* How to leverage highlighting in results

## Add a SearchBox

Now that we’ve added the results, we can start querying our index. To do this, we are going to use the Searchbox widget. Let’s add it in the application template:

```html
<!-- <ng-ais-instantsearch [config]="{...}"> -->
  <ng-ais-search-box></ng-ais-search-box>
  <!-- <ng-ais-hits></ng-ais-hits> -->
<!-- </ng-ais-instantsearch> -->
```

The search is now interactive and we see what matched in each of the products. Good thing for us, Algolia computes the matching part. For better control over what kind of data is returned, you should configure the [attributeToRetrieve](https://www.algolia.com/doc/rest#param-attributesToRetrieve) and [attributeToHighlight](https://www.algolia.com/doc/rest#param-attributesToHighlight) of your index

In this part, we’ve seen:

* How to use the searchbox to query Algolia with text

## Add a RefinementList

While the SearchBox is the way to go when it comes to textual search, you may also want to provide filters based on the structure of the records.

Algolia provides a set of parameters for filtering by facets, numbers or geo location. Angular InstantSearch packages those into a set of widgets.

Since the dataset used here is an e-commerce one, let’s add a [RefinementList](/widgets/refinement-list.md) to filter the products by categories:

```html
<ng-ais-instantsearch [config]="{...}">
  <!-- <ng-ais-search-box></ng-ais-search-box> -->

  <ng-ais-refinement-list attribute="brand"></ng-ais-refinement-list>

  <!-- <ng-ais-hits></ng-ais-hits> -->
</ng-ais-instantsearch>
```

The `attributeName` option specifies the faceted attribute to use in this widget. This attribute should be declared as a facet in the index configuration as well.

The values displayed are computed by Algolia from the results.

In this part, we’ve seen that:

* There are components for different types of filters
* The RefinementList works with facets
* Facets are computed from the results

Here's the result:
![RefinementList](./refinement-list.png)

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
  <ng-ais-refinement-list attribute="category">
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
  <ng-ais-pagination [totalPages]="20">
  </ng-ais-pagination>
</ng-ais-instantsearch>
```

Current filters will display all the filters currently selected by the user. This gives the user a synthetic way of understanding the current search. ClearAll displays a button to remove all the filters.

In this part, we’ve seen:

* How to clear the filters
* How to paginate the results

## Wrapping up

Congratulations, you now have a fully featured InstantSearch result page. But this is only the beginning! If you want to dig further into Angular InstantSearch, we suggest reading the other guides and the widgets API.
