import { Component, Injector, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { history } from 'instantsearch.js/es/lib/routers';
import { simple } from 'instantsearch.js/es/lib/stateMappings';
import { StateMapping } from 'instantsearch.js/es/types';
import { createSSRSearchClient } from 'angular-instantsearch';
import * as qs from 'qs';

function parseServerRequest(
  req: { url: string } | undefined,
  stateMapping: StateMapping
) {
  if (!req || !req.url) {
    return undefined;
  }

  // Transform the URL into RouteState, this is likely the same
  // implementation as router.read(), but without reading from the environment.
  const routeState = qs.parse(req.url.slice(req.url.lastIndexOf('?') + 1), {
    arrayLimit: 99,
  });

  // Transform from RouteState into UiState using the stateMapping
  return stateMapping.routeToState(routeState);
}

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <ais-instantsearch [config]="instantsearchConfig">
        <div class="jumbotron">
          <p class="text-center">
            <ais-search-box placeholder="Search a product"></ais-search-box>
          </p>

          <div class="row">
            <div class="col-4">
              <ais-hierarchical-menu
                header="Show results for"
                [attributes]="['hierarchicalCategories.lvl0', 'hierarchicalCategories.lvl1', 'hierarchicalCategories.lvl2']"
                [sortBy]="['name:asc']"
              >
              </ais-hierarchical-menu>
            </div>

            <div class="col-4">
              <ais-refinement-list
                header="Brands"
                attribute="brand"
                operator="or"
                limit="10"
              >
              </ais-refinement-list>
            </div>

            <div class="col-4">
              <ais-sort-by
                header="Sort by"
                [items]="
                  [
                    {value: 'instant_search', label: 'Featured'},
                    {value: 'instant_search_price_asc', label: 'Price asc.'},
                    {value: 'instant_search_price_desc', label: 'Price desc.'}
                  ]
                "
              >
              </ais-sort-by>
            </div>
          </div>
        </div>
        <ais-hits></ais-hits>
        <hr>
        <ais-pagination></ais-pagination>
      </ais-instantsearch>
    </div>
  `,
  styles: [],
})
export class AppComponent {
  public instantsearchConfig: {};

  constructor(
    private httpClient: HttpClient,
    private transferState: TransferState,
    private injector: Injector,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    const routing = { router: history(), stateMapping: simple() };

    const req = isPlatformServer(this.platformId)
      ? this.injector.get('request')
      : undefined;

    const initialUiState = parseServerRequest(req, routing.stateMapping);

    this.instantsearchConfig = {
      indexName: 'instant_search',
      routing,
      initialUiState,
      searchClient: createSSRSearchClient({
        appId: 'latency',
        apiKey: '6be0576ff61c053d5f9a3225e2a90f76',
        makeStateKey,
        HttpHeaders,
        transferState: this.transferState,
        httpClient: this.httpClient,
      }),
    };
  }
}
