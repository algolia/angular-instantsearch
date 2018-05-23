import { Component, OnDestroy } from "@angular/core";

@Component({
  selector: "app-search",
  template: `
    <ais-instantsearch
      [config]="{
        appId: 'latency',
        apiKey: '6be0576ff61c053d5f9a3225e2a90f76',
        indexName: 'ikea',
        routing: true
      }"
    >
      <div class="jumbotron">
        <p class="text-center">
          <ais-search-box placeholder="Search a product"></ais-search-box>
        </p>

        <div class="row">
          <div class="col-4">
            <ais-panel header="Show results for">
              <ais-hierarchical-menu
                [attributes]="['category', 'sub_category', 'sub_sub_category']"
                [sortBy]="['name:asc']"
              >
              </ais-hierarchical-menu>
            </ais-panel>
          </div>

          <div class="col-4">
            <ais-panel header="Colors">
              <ais-refinement-list
                attribute="colors"
                operator="or"
                limit="10"
              >
              </ais-refinement-list>
            </ais-panel>
          </div>

          <div class="col-4">
            <ais-panel header="Sort by">
              <ais-sort-by
                [items]="
                  [
                    {name: 'ikea', label: 'Featured'},
                    {name: 'ikea_price_asc', label: 'Price asc.'},
                    {name: 'ikea_price_desc', label: 'Price desc.'}
                  ]
                "
              >
              </ais-sort-by>
            </ais-panel>
            <hr />
            <ais-menu-select>
            </ais-menu-select>
          </div>
        </div>
      </div>
      <ais-hits></ais-hits>
      <hr>
      <ais-pagination></ais-pagination>
    </ais-instantsearch>
  `,
  styles: []
})
export class SearchComponent implements OnDestroy {
  ngOnDestroy() {
    console.log("SearchComponent::ngOnDestroy");
  }
}
