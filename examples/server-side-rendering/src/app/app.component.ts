import { Component, Injector, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { simple } from 'instantsearch.js/es/lib/stateMappings';
import { createSSRSearchClient, ssrRouter } from 'angular-instantsearch';

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
    const routing = { router: ssrRouter(), stateMapping: simple() };

    let initialUiState = undefined;
    if (isPlatformServer(this.platformId)) {
      // get the server (express) request object
      const req = this.injector.get('request');

      // Transform the URL into RouteState, this is likely the same
      const routeState = routing.router.readServer(req);

      // Transform from RouteState into UiState using the stateMapping
      initialUiState = routing.stateMapping.routeToState(routeState);
    }

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
