import { Component, OnDestroy } from "@angular/core";

@Component({
  selector: "app-search",
  template: `
    <ng-ais-instantsearch
      [config]="{
        appId: 'latency',
        apiKey: '6be0576ff61c053d5f9a3225e2a90f76',
        indexName: 'ikea',
        urlSync: true
      }"
    >
      <div class="jumbotron">
        <p class="text-center">
          <ng-ais-search-box placeholder="Search a product"></ng-ais-search-box>
        </p>

        <div class="row">
          <div class="col-4">
            <ng-ais-panel header="Show results for">
              <ng-ais-hierarchical-menu
                [attributes]="['category', 'sub_category', 'sub_sub_category']"
                [sortBy]="['name:asc']"
              >
              </ng-ais-hierarchical-menu>
            </ng-ais-panel>
          </div>

          <div class="col-4">
            <ng-ais-panel header="Colors">
              <ng-ais-refinement-list
                attribute="colors"
                operator="or"
                limit="10"
              >
              </ng-ais-refinement-list>
            </ng-ais-panel>
          </div>

          <div class="col-4">
            <ng-ais-panel header="Sort by">
              <ng-ais-sort-by
                [items]="
                  [
                    {name: 'ikea', label: 'Featured'},
                    {name: 'ikea_price_asc', label: 'Price asc.'},
                    {name: 'ikea_price_desc', label: 'Price desc.'}
                  ]
                "
              >
              </ng-ais-sort-by>
            </ng-ais-panel>
            <hr />
            <ng-ais-menu-select>
            </ng-ais-menu-select>
          </div>
        </div>
      </div>
      <ng-ais-hits></ng-ais-hits>
      <hr>
      <ng-ais-pagination></ng-ais-pagination>
    </ng-ais-instantsearch>
  `,
  styles: []
})
export class SearchComponent implements OnDestroy {
  ngOnDestroy() {
    console.log("SearchComponent::ngOnDestroy");
  }
}
