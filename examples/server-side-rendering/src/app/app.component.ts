import { Component, Injector, Inject, PLATFORM_ID } from "@angular/core";
import { isPlatformServer } from "@angular/common";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { TransferState, makeStateKey } from "@angular/platform-browser";

import {
  createSSRSearchClient,
  parseServerRequest
} from "angular-instantsearch";

@Component({
  selector: "app-root",
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
                [attributes]="['category', 'sub_category', 'sub_sub_category']"
                [sortBy]="['name:asc']"
              >
              </ais-hierarchical-menu>
            </div>

            <div class="col-4">
              <ais-refinement-list
                header="Colors"
                attribute="colors"
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
                    {name: 'instant_search', label: 'Featured'},
                    {name: 'instant_search_price_asc', label: 'Price asc.'},
                    {name: 'instant_search_price_desc', label: 'Price desc.'}
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
  styles: []
})
export class AppComponent {
  public instantsearchConfig: {};

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
      indexName: "instant_search",
      urlSync: true,
      searchClient: createSSRSearchClient({
        makeStateKey,
        HttpHeaders,
        appId: "latency",
        apiKey: "6be0576ff61c053d5f9a3225e2a90f76",
        transferState: this.transferState,
        httpClient: this.httpClient
      })
    };
  }
}
