import { Component, Injector, Inject, PLATFORM_ID } from "@angular/core";
import { isPlatformServer } from "@angular/common";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { TransferState, makeStateKey } from "@angular/platform-browser";

import {
  createSSRAlgoliaClient,
  parseServerRequest
} from "angular-instantsearch";

@Component({
  selector: "app-root",
  template: `
    <div class="container">
      <ng-ais-instantsearch [config]="instantsearchConfig">
        <div class="jumbotron">
          <p class="text-center">
            <ng-ais-search-box placeholder="Search a product"></ng-ais-search-box>
          </p>

          <div class="row">
            <div class="col-4">
              <ng-ais-hierarchical-menu
                header="Show results for"
                [attributes]="['category', 'sub_category', 'sub_sub_category']"
                [sortBy]="['name:asc']"
              >
              </ng-ais-hierarchical-menu>
            </div>

            <div class="col-4">
              <ng-ais-refinement-list
                header="Colors"
                attribute="colors"
                operator="or"
                limit="10"
              >
              </ng-ais-refinement-list>
            </div>

            <div class="col-4">
              <ng-ais-sort-by
                header="Sort by"
                [items]="
                  [
                    {name: 'ikea', label: 'Featured'},
                    {name: 'ikea_price_asc', label: 'Price asc.'},
                    {name: 'ikea_price_desc', label: 'Price desc.'}
                  ]
                "
              >
              </ng-ais-sort-by>
            </div>
          </div>
        </div>
        <ng-ais-hits></ng-ais-hits>
        <hr>
        <ng-ais-pagination></ng-ais-pagination>
      </ng-ais-instantsearch>
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
      appId: "latency",
      apiKey: "6be0576ff61c053d5f9a3225e2a90f76",
      indexName: "ikea",
      urlSync: true,
      createAlgoliaClient: createSSRAlgoliaClient({
        makeStateKey,
        HttpHeaders,
        transferState: this.transferState,
        httpClient: this.httpClient
      })
    };
  }
}
