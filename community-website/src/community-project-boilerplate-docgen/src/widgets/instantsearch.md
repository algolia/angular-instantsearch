---
title: Widgets - Instantsearch
layout: widget.pug
---

# Instantsearch

## Description

Is the root component of all Angular InstantSearch implementations.

## Options

| Attributes    | Type            | Description
| -             | -               | -
| `config`      | `ConfigOptions` | The config object to pass to the instantsearch instance

Three parameters are required to get you started with instantsearch.js:

* `appId`: your algolia application id
* `apiKey`: the search key associated with your application
* `indexName`: the main index that you will use for your new search UI

Those parameters can be found in your [Algolia dashboard](https://www.algolia.com/api-keys).

## Code example

```js
@Component({
  selector: 'ais-app',
  template: `
    <ais-instantsearch
      [config]="{
        apiKey: '6be0576ff61c053d5f9a3225e2a90f76',
        appId: 'latency',
        indexName: 'instant_search'
      }"
    >
    </ais-instantsearch>
  `
})
export class AppComponent {}
```

## Config object options

`appId: string`
> The Algolia application ID

`apiKey: string`
> The Algolia search-only API key

`indexName: string`
> The name of the main index

`numberLocale?: string`
> The locale used to display numbers. This will be passed to `Number.prototype.toLocaleString()`

`searchFunction?: Function`
> A hook that will be called each time a search needs to be done, with the helper as a parameter. It’s your responsibility to call `helper.search()`. This option allows you to avoid doing searches at page load for example.

`createAlgoliaClient?: (algoliasearch: Function, appId: string, apiKey: string) => CustomClient`
> _Deprecated in favor of `searchClient`._
> Allows you to provide your own algolia client instead of the one instantiated internally.
> Useful in situations where you need to setup complex mechanism on the client or if you need to share it easily.
> We forward `algoliasearch` which is the original algoliasearch module imported inside angular-instantsearch.

`searchClient?: {}`
> The search client to plug to InstantSearch.js.

`searchParameters?: {}`
> Additional parameters to pass to the Algolia API.

`urlSync?: boolean | URLSyncOptions`
> Url synchronization configuration. Setting to true will synchronize the needed search parameters with the browser url.

#### URLSyncOptions

`mapping?: {}`
> Object used to define replacement query parameter to use in place of another. Keys are current query parameters and value the new value, e.g. `{ q: 'query' }`.

`threshold?: number`
> Idle time in ms after which a new state is created in the browser history. The default value is 700. The url is always updated at each keystroke but we only create a “previous search state” (activated when click on back button) every 700ms of idle time.

`trackedParameters?: string[]`
> Parameters that will be synchronized in the URL.
> Default value is `['query', 'attribute:\*', 'index', 'page', 'hitsPerPage']`. attribute:* means all the faceting attributes will be tracked. You can track only some of them by using `[…, 'attribute:color', 'attribute:categories']`. All other possible values are all the attributes of the Helper SearchParameters.

`useHash?: boolean`
> If set to true, the url will be hash based. Otherwise, it’ll use the query parameters using the modern history API.

`getHistoryState?: Function`
> Pass this function to override the default history API state we set to null. For example this could be used to force passing `{turbolinks: true}` to the history API every time we update it.

#### Events

You can register to the `(change)` event on the `<ais-instantsearch>` which will be fired after every new search. This event is useful for instance to push data to Google Analytics to know more about your users search:

```html
<ais-instantsearch
  [config]="{...}"
  (change)="onSearchChange($event)"
>
</ais-instantsearch>
```

```js
onSearchChange({ results, state }: { results: {}, state: {} }) {
  // Do what ever you need with the results or the state of search
}
```
