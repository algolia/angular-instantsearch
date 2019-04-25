import { Component, OnDestroy } from '@angular/core';
import algoliasearch from 'algoliasearch/lite';

@Component({
  selector: 'app-search',
  template: `
    <ais-instantsearch [config]="config">
      <div class="jumbotron">
        <p class="text-center">
          <ais-search-box placeholder="Search a product"></ais-search-box>
        </p>

        <div class="row">
          <div class="col-4">
            <ais-panel header="Show results for">
              <ais-hierarchical-menu
                [attributes]="['hierarchicalCategories.lvl0', 'hierarchicalCategories.lvl1', 'hierarchicalCategories.lvl2']"
                [sortBy]="['isRefined', 'name:asc']"
              >
              </ais-hierarchical-menu>
            </ais-panel>
          </div>

          <div class="col-4">
            <ais-panel header="Brands">
              <ais-refinement-list
                attribute="brand"
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
                    {value: 'instant_search', label: 'Featured'},
                    {value: 'instant_search_price_asc', label: 'Price asc.'},
                    {value: 'instant_search_price_desc', label: 'Price desc.'}
                  ]
                "
              >
              </ais-sort-by>
            </ais-panel>
            <hr />
            <ais-menu-select attribute="price_range">
            </ais-menu-select>
          </div>
        </div>
      </div>
      <ais-hits></ais-hits>
      <hr>
      <ais-pagination></ais-pagination>
    </ais-instantsearch>
  `,
  styles: [],
})
export class SearchComponent implements OnDestroy {
  config = {
    searchClient: algoliasearch('latency', '6be0576ff61c053d5f9a3225e2a90f76'),
    indexName: 'instant_search',
    routing: true,
  };

  ngOnDestroy() {
    console.log('SearchComponent::ngOnDestroy');
  }
}
