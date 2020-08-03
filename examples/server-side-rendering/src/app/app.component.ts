import { Component, Injector, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { simple } from 'instantsearch.js/es/lib/stateMappings';
import { createSSRSearchClient } from 'angular-instantsearch';
import {
  InstantSearchConfig,
  SearchParameters,
} from 'angular-instantsearch/instantsearch/instantsearch';
import { ssrRouter } from './ssrRouter';

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
  public instantsearchConfig: InstantSearchConfig;
  public searchParameters: SearchParameters;

  constructor(
    private httpClient: HttpClient,
    private transferState: TransferState,
    private injector: Injector,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.instantsearchConfig = {
      indexName: 'instant_search',
      routing: {
        router: ssrRouter(() => {
          if (isPlatformServer(this.platformId)) {
            const req = this.injector.get('request');
            return req.url;
          }
          return window.location.href;
        }),
        stateMapping: simple(),
      },
      searchClient: createSSRSearchClient({
        makeStateKey,
        HttpHeaders,
        appId: 'latency',
        apiKey: '6be0576ff61c053d5f9a3225e2a90f76',
        transferState: this.transferState,
        httpClient: this.httpClient,
      }),
    };
  }
}
