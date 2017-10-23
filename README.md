# angular-instantsearch
> ⚡️ Lightning-fast search for Angular2+ apps, by Algolia.


## Getting started

### Installation

First install `angular-instantsearch` via npm:

* `$ yarn add angular-instantsearch` OR
* `$ npm install --save angular-instantsearch`

Once installed you need to import our main module into your Angular application:

```ts
import { NgISModule } from 'angular-instantsearch';
```

The only remaining part is to list the imported module in your root module and in any additional application modules that make use of `angular-instantsearch`.

The exact method will be slightly different the root (top-level) module because you need to call `.forRoot()` static method from the `angular-instantsearch` main module.

* For your application root module:

```ts
import { NgISModule } from 'angular-instantsearch';

@NgModule({
  declarations: [AppComponent, ...],
  imports: [NgISModule.forRoot(), ...],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

* Other modules in your application can simply import `NgISModule`:

```ts
import { NgISModule } from 'angular-instantsearch';

@NgModule({
  declarations: [OtherComponent, ...],
  imports: [NgISModule, ...]
})
export class OtherModule {}
```

### Widgets

##### `<ngis-instantsearch></ngis-instantsearch>`

> Is the root component of all Angular InstantSearch implementations.

| Props    | Type     | Description
| -        | -        | -
| `config` | `object` | The config object to pass to the instantsearch instance

The config object has the same format as InstantSearch.js options, you can see the full available options [here](https://community.algolia.com/instantsearch.js/v2/instantsearch.html#struct-InstantSearchOptions).

Example:

```ts
@Component({
  selector: 'ngis-app',
  template: `
    <ngis-instantsearch [config]='config'>
    </ngis-instantsearch>
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

##### `<ngis-search-box></ngis-search-box>`

> The SearchBox component displays a search box that lets the user search for a specific query.

| Props             | Type      | Description
| -                 | -         | -
| `placeholder?`    | `string`  | The label of the input placeholder.
| `submitTitle`     | `string`  | The submit button title.
| `resetTitle`      | `string`  | The reset button title.
| `searchAsYouType` | `boolean` | If you disable this option, new searches will only be triggered by clicking the search button or by pressing the enter key while the search box is focused.

---

##### `<ngis-hits></ngis-hits>`

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
    <ngis-hits>
      <ng-template let-hits="state.hits">
        <ul>
          <li *ngFor="let hit of hits">
            {{hit.name}}
          </li>
        </ul>
      </ng-template>
    </ngis-hits>
  `
})
export class AppComponent {}
```

---

##### `<ngis-clear-all></ngis-clear-all>`

> The ClearAll widget displays a button that lets the user clean every refinement applied to the search.

| Props                | Type            | Description
| -                    | -               | -
| `clearsQuery?`       | `boolean`       | Pass true to also clear the search query
| `excludeAttributes?` | `Array<string>` | Every attributes that should not be removed on clear
| `header?`            | `string`        | Displays text before widget
| `footer?`            | `string`        | Displays text after widget

---

##### `<ngis-menu></ngis-menu>`

> The Menu component displays a menu that lets the user choose a single value for a specific attribute.


| Props            | Type                     | Description
| -                | -                        | -
| `attributeName`  | `string`                 | Name of the attribute for faceting (eg. "free_shipping")
| `limit?`         | `number`                 | How many facets values to retrieve
| `showMoreLimit?` | `number`                 | Bigger than `limit` if the component should display a button that will expand the number of items
| `showMoreLabel?` | `string`                 | Label of the show more button
| `showLessLabel?` | `string`                 | Label of the show less button
| `sortBy?`        | `Array<string>/function` | How to sort facet values
| `header?`        | `string`                 | Displays text before widget
| `footer?`        | `string`                 | Displays text after widget

---

##### `<ngis-pagination></ngis-pagination>`

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

##### `<ngis-refinement-list></ngis-refinement-list>`

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

##### `<ngis-hits-per-page-selector></ngis-hits-per-page-selector>`

> The HitsPerPageSelector widget displays a dropdown menu to let the user change the number of displayed hits.

| Props     | Type                                                  | Description
| -         | -                                                     | -
| `items`   | `{value: number, label: string, default?: boolean}[]` | List of available options
| `header?` | `string`                                              | Displays text before widget
| `footer?` | `string`                                              | Displays text after widget

---

##### `<ngis-sort-by-selector></ngis-sort-by-selector>`

> The SortBySelector component displays a list of indexes allowing a user to change the hits are sorting.

| Props       | Type                              | Description
| -           | -                                 | -
| `indices`   | `{name: string, label: string}[]` | The list of indexes to search in
| `header?`   | `string`                          | Displays text before widget
| `footer?`   | `string`                          | Displays text after widget

---

##### `<ngis-numeric-selector></ngis-numeric-selector>`

> The NumericSelector component lets the user choose between numerical refinements from a dropdown menu.

| Props           | Type                                   | Description
| -               | -                                      | -
| `attributeName` | `string`                               | Name of the numeric attribute to use
| `options`       | `{value: number, label: string}[]`     | The list of indexes to search in
| `operator?`     | `"<" / "<=" / "=" / ">=" / ">" / "!="` | The operator to use to refine
| `header?`       | `string`                               | Displays text before widget
| `footer?`       | `string`                               | Displays text after widget

---

##### `<ngis-numeric-refinement-list></ngis-numeric-refinement-list>`

> The NumericRefinementList is a component that displays a list of numeric filters in a list. Those numeric filters are pre-configured with creating the widget.

| Props       | Type                                                 | Description
| -               | -                                                | -
| `attributeName` | `string`                                         | Name of the numeric attribute to use
| `options`       | `{name: string, start?: number, end?: number}[]` | The list of indexes to search in
| `header?`       | `string`                                         | Displays text before widget
| `footer?`       | `string`                                         | Displays text after widget
