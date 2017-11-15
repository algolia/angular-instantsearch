## Routing and URLs

Angular InstantSearch comes out of the box with an URLSync mechanism. You can enable it by passing `urlSync: true` to your main [`<ng-ais-instantsearch>`](/widgets/instantsearch.md) config:


```html
<ng-ais-instantsearch [config]="{
        appId: ...,
        appKey: ...,
        indexName: ...,
        urlSync: true
    }"
>
</ng-ais-instantsearch>
```

You can also pass an object of `URLSyncOptions` to the `urlSync` option in order to customize the URLSync mechanism:

#### `URLSyncOptions`

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



