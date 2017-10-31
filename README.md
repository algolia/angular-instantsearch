# angular-instantsearch
> ⚡️ Lightning-fast search for Angular2+ apps, by Algolia.


## Getting started

### Installation

First install `angular-instantsearch` via npm:

* `$ yarn add angular-instantsearch` OR
* `$ npm install --save angular-instantsearch`

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

### Widgets

##### `<ng-ais-instantsearch></ng-ais-instantsearch>`

> Is the root component of all Angular InstantSearch implementations.

| Props    | Type     | Description
| -        | -        | -
| `config` | `object` | The config object to pass to the instantsearch instance

The config object has the same format as InstantSearch.js options, you can see the full available options [here](https://community.algolia.com/instantsearch.js/v2/instantsearch.html#struct-InstantSearchOptions).

Example:

```ts
@Component({
  selector: 'ng-ais-app',
  template: `
    <ng-ais-instantsearch [config]='config'>
    </ng-ais-instantsearch>
  `
})
export class AppComponent {
  public config = {
    apiKey: '6be0576ff61c053d5f9a3225e2a90f76',
    appId: 'latency',
    indexName: 'instant_search'
  };
}
```

---

##### `<ng-ais-search-box></ng-ais-search-box>`

> The SearchBox component displays a search box that lets the user search for a specific query.

| Props             | Type      | Description
| -                 | -         | -
| `placeholder?`    | `string`  | The label of the input placeholder.
| `submitTitle`     | `string`  | The submit button title.
| `resetTitle`      | `string`  | The reset button title.
| `searchAsYouType` | `boolean` | If you disable this option, new searches will only be triggered by clicking the search button or by pressing the enter key while the search box is focused.

---

##### `<ng-ais-hits></ng-ais-hits>`

> Displays a list of hits.

| Props     | Type     | Description
| -         | -        | -
| `header?` | `string` | Displays text before widget
| `footer?` | `string` | Displays text after widget

You can use the directive `<ng-template></ng-template>` to customize the output:

```ts
@Component({
  selector: 'my-app',
  template: `
    <ng-ais-hits>
      <ng-template let-hits="state.hits">
        <ul>
          <li *ngFor="let hit of hits">
            {{hit.name}}
          </li>
        </ul>
      </ng-template>
    </ng-ais-hits>
  `
})
export class AppComponent {}
```

---

##### `<ng-ais-clear-all></ng-ais-clear-all>`

> The ClearAll widget displays a button that lets the user clean every refinement applied to the search.

| Props                | Type            | Description
| -                    | -               | -
| `clearsQuery?`       | `boolean`       | Pass true to also clear the search query
| `excludeAttributes?` | `Array<string>` | Every attributes that should not be removed on clear
| `header?`            | `string`        | Displays text before widget
| `footer?`            | `string`        | Displays text after widget

---

##### `<ng-ais-menu></ng-ais-menu>`

> The Menu component displays a menu that lets the user choose a single value for a specific attribute.


| Props            | Type                     | Description
| -                | -                        | -
| `attributeName`  | `string`                 | Name of the attribute for faceting (eg. "free_shipping")
| `limitMin?`      | `number`                 | How many facets values to retrieve
| `limitMax?`      | `number`                 | Bigger than `limit` if the component should display a button that will expand the number of items
| `showMoreLabel?` | `string`                 | Label of the show more button
| `showLessLabel?` | `string`                 | Label of the show less button
| `sortBy?`        | `Array<string>/function` | How to sort facet values
| `header?`        | `string`                 | Displays text before widget
| `footer?`        | `string`                 | Displays text after widget

---

##### `<ng-ais-pagination></ng-ais-pagination>`

> The Pagination widget displays a simple pagination system allowing the user to change the current page.

| Props           | Type      | Description
| -               | -         | -
| `maxPages?`     | `number`  | Maximum number of pages to display
| `showFirst?`    | `boolean` | Display the first page link
| `showLast?`     | `boolean` | Display the last page link
| `showPrevious?` | `boolean` | Display the previous page link
| `showNext?`     | `boolean` | Display the next page link
| `pagesPadding?` | `number`  | How many page links to display around the current page
| `header?`       | `string`  | Displays text before widget
| `footer?`       | `string`  | Displays text after widget

---

##### `<ng-ais-refinement-list></ng-ais-refinement-list>`

> The RefinementList component displays a list that let the end user choose multiple values for a specific facet.

| Props            | Type                     | Description
| -                | -                        | -
| `attributeName`  | `string`                 | Name of the attribute for faceting (eg. "categories")
| `operator?`      | `"and" | "or"`           | How to apply the refinements.
| `limit?`         | `number`                 | How much facet values to get.
| `showMoreLimit?` | `number`                 | Bigger than `limit` if the component should display a button that will expand the number of items
| `showMoreLabel?` | `string`                 | Label of the show more button
| `showLessLabel?` | `string`                 | Label of the show less button
| `sortBy?`        | `Array<string>/function` | How to sort facet values
| `header?`        | `string`                 | Displays text before widget
| `footer?`        | `string`                 | Displays text after widget

---

##### `<ng-ais-hits-per-page-selector></ng-ais-hits-per-page-selector>`

> The HitsPerPageSelector widget displays a dropdown menu to let the user change the number of displayed hits.

| Props     | Type                                                  | Description
| -         | -                                                     | -
| `items`   | `{value: number, label: string, default?: boolean}[]` | List of available options
| `header?` | `string`                                              | Displays text before widget
| `footer?` | `string`                                              | Displays text after widget

---

##### `<ng-ais-sort-by-selector></ng-ais-sort-by-selector>`

> The SortBySelector component displays a list of indexes allowing a user to change the hits are sorting.

| Props       | Type                              | Description
| -           | -                                 | -
| `indices`   | `{name: string, label: string}[]` | The list of indexes to search in
| `header?`   | `string`                          | Displays text before widget
| `footer?`   | `string`                          | Displays text after widget

---

##### `<ng-ais-numeric-selector></ng-ais-numeric-selector>`

> The NumericSelector component lets the user choose between numerical refinements from a dropdown menu.

| Props           | Type                                   | Description
| -               | -                                      | -
| `attributeName` | `string`                               | Name of the numeric attribute to use
| `options`       | `{value: number, label: string}[]`     | The list of indexes to search in
| `operator?`     | `"<" / "<=" / "=" / ">=" / ">" / "!="` | The operator to use to refine
| `header?`       | `string`                               | Displays text before widget
| `footer?`       | `string`                               | Displays text after widget

---

##### `<ng-ais-numeric-refinement-list></ng-ais-numeric-refinement-list>`

> The NumericRefinementList is a component that displays a list of numeric filters in a list. Those numeric filters are pre-configured with creating the widget.

| Props       | Type                                                 | Description
| -               | -                                                | -
| `attributeName` | `string`                                         | Name of the numeric attribute to use
| `options`       | `{name: string, start?: number, end?: number}[]` | The list of indexes to search in
| `header?`       | `string`                                         | Displays text before widget
| `footer?`       | `string`                                         | Displays text after widget


---

##### `<ng-ais-stats></ng-ais-stats>`

> The Stats component displays the total number of matching hits and the time it took to get them (time spent in the Algolia server).

| Props     | Type     | Description
| -         | -        | -
| `header?` | `string` | Displays text before widget
| `footer?` | `string` | Displays text after widget

You can use the directive `<ng-template></ng-template>` to customize the output:

```ts
@Component({
  selector: 'my-app',
  template: `
    <ng-ais-stats>
      <ng-template let-state="state">
        {{stats.nbHits}} results found in {{stats.processingTimeMS}}ms.
      </ng-template>
    </ng-ais-stats>
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


---

##### `<ng-ais-toggle></ng-ais-toggle>`

> The toggle widget lets the user either:
>
> * switch between two values for a single facetted attribute (free_shipping / not_free_shipping)
> * toggle a faceted value on and off (only ‘canon’ for brands)
>
> This widget is particularly useful if you have a boolean value in the records.

| Props     | Type                                  | Description
| -         | -                                     | -
| `attributeName` | `string`                        | Name of the attribute for faceting (eg. “free_shipping”)
| `label`         | `string`                        | Human-readable name of the filter (eg. “Free Shipping”)
| `values`        | `{on?: boolean, off?: boolean}` | Value to filter on when unchecked. element (when using the default template). By default when switching to off, no refinement will be asked. So you will get both true and false results. If you set the off value to false then you will get only objects having false has a value for the selected attribute
| `header?` | `string`                              | Displays text before widget
| `footer?` | `string`                              | Displays text after widget

---

##### `<ng-ais-infinite-hits></ng-ais-infinite-hits>`

> Displays a list of hits.

| Props            | Type     | Description
| -                | -        | -
| `showMoreLabel?` | `string` | Label used on the show more button.
| `header?`        | `string` | Displays text before widget
| `footer?`        | `string` | Displays text after widget

You can use the directive `<ng-template></ng-template>` to customize the output:

```ts
@Component({
  selector: 'my-app',
  template: `
    <ng-ais-infinite-hits>
      <ng-template let-hits="state.hits">
        <ul>
          <li *ngFor="let hit of hits">
            {{hit.name}}
          </li>
        </ul>
      </ng-template>
    </ng-ais-infinite-hits>
  `
})
export class AppComponent {}
```

---

##### `<ng-ais-current-refined-values></ng-ais-current-refined-values>`

> The current refined values widget has two purposes:
>
> * give the user a synthetic view of the current filters.
> * give the user the ability to remove a filter.
>
> This widget is usually in the top part of the search UI.

| Props            | Type                            | Description
| -                | -                               | -
| `attributes?`    | `{name: string, label: string}` | Label definitions for the different filters
| `onlyListedAttributes?` | `boolean` | Only use the declared attributes. By default, the widget displays the refinements for the whole search state. If true, the list of `attributes` in attributes is used
| `clearAll?`      | `"before" / "after" / boolean`  | Defines the clear all button position. By default, it is placed before the set of current filters. If the value is false, the button won’t be added in the widget
| `clearsQuery?`   | `boolean`                       | If true, the clear all button also clears the active search query.
| `clearAllLabel?` | `string`                        | Label used on the clear all button.
| `header?`        | `string`                        | Displays text before widget
| `footer?`        | `string`                        | Displays text after widget

---

##### `<ng-ais-price-ranges></ng-ais-price-ranges>`

> Price ranges widget lets the user choose from of a set of predefined ranges. The ranges are displayed in a list.

| Props            | Type       | Description
| -                | -          | -
| `attributeName`  | `string`   | Name of the attribute for faceting
| `currency`       | `string`   | The currency to display
| `formatLabel`    | `function` | Function that takes an item as argument and return a string to display
| `header?`        | `string`   | Displays text before widget
| `footer?`        | `string`   | Displays text after widget

---

##### `<ng-ais-hierarchical-menu></ng-ais-hierarchical-menu>`

> The hierarchical menu widget is used to create a navigation based on a hierarchy of facet attributes.
>
> It is commonly used for categories with subcategories.

| Props              | Type                     | Description
| -                  | -                        | -
| `attributes`       | `string[]`               | Array of attributes to use to generate the hierarchy of the menu
| `limit?`           | `number`                 | How much facet values to get
| `separator?`       | `string`                 | Separator used in the attributes to separate level values
| `rootPath?`        | `string`                 | Prefix path to use if the first level is not the root level
| `showParentLevel?` | `boolean`                | Show the parent level of the current refined value
| `sortBy?`          | `Array<string>/function` | How to sort facet values
| `header?`          | `string`                 | Displays text before widget
| `footer?`          | `string`                 | Displays text after widget

---

##### `<ng-ais-star-rating></ng-ais-star-rating>`

> Star rating is used for displaying grade like filters. The values are normalized within boundaries.

| Props            | Type       | Description
| -                | -          | -
| `attributeName`  | `string`   | Name of the attribute for faceting
| `andUpLabel?`    | `string`   | Label to display after the stars
| `max?`           | `number`   | The maximum rating value
| `header?`        | `string`   | Displays text before widget
| `footer?`        | `string`   | Displays text after widget

---

##### `<ng-ais-range-slider></ng-ais-range-slider>`

| Props            | Type       | Description
| -                | -          | -
| `attributeName`  | `string`   | Name of the attribute for faceting
| `pips?`          | `boolean`  | Show slider pips
| `tooltips?`      | `boolean`  | Should we show tooltips or not.
| `min?`           | `number`   | Minimal slider value, default to automatically computed
| `max?`           | `number`   | Minimal slider value, default to automatically computed
| `header?`        | `string`   | Displays text before widget
| `footer?`        | `string`   | Displays text after widget

---

##### `<ng-ais-breadcrumb></ng-ais-breadcrumb>`

| Props              | Type       | Description
| -                  | -          | -
| `attributes`       | `string[]` | Array of attributes to use to craft the Breadcrumb
| `rootPath?`        | `string`   | Prefix path to use if the first level is not the root level
| `header?`          | `string`   | Displays text before widget
| `footer?`          | `string`   | Displays text after widget
