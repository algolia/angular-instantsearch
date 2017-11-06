import { Component } from "@angular/core";

@Component({
  selector: "ng-ais-app",
  template: `
    <ng-ais-instantsearch [config]="config">
      <h1>Angular InstantSearch demo</h1>
      <ng-ais-hits-per-page-selector [items]="items"></ng-ais-hits-per-page-selector>
      <ng-ais-sort-by-selector [indices]="indices"></ng-ais-sort-by-selector>
      <ng-ais-search-box></ng-ais-search-box>
      <ng-ais-clear-all></ng-ais-clear-all>
      <ng-ais-breadcrumb
        [attributes]="hierarchicalMenuAttributes"
      >
      </ng-ais-breadcrumb>
      <ng-ais-hits></ng-ais-hits>
      <ng-ais-pagination></ng-ais-pagination>
      <ng-ais-numeric-refinement-list
        attributeName="price"
        [options]="numericRefinementListOptions"
      >
      </ng-ais-numeric-refinement-list>
      <ng-ais-range-slider attributeName="price"></ng-ais-range-slider>
      <ng-ais-menu
        attributeName="categories"
        limitMin="{{5}}"
        limitMax="{{10}}"
      ></ng-ais-menu>
      <ng-ais-refinement-list
        attributeName="brand"
        limitMin="{{10}}"
        withSearchBox="true"
      >
      </ng-ais-refinement-list>
      <ng-ais-numeric-selector
        attributeName="popularity"
        operator=">="
        [options]="numericSelectorOptions"
      >
      </ng-ais-numeric-selector>
      <ng-ais-toggle
        attributeName="free_shipping"
        label="Free Shipping (toggle single value)"
      >
      </ng-ais-toggle>
      <ng-ais-price-ranges attributeName="price"></ng-ais-price-ranges>
      <ng-ais-current-refined-values></ng-ais-current-refined-values>
      <ng-ais-stats></ng-ais-stats>
      <ng-ais-hierarchical-menu
        rootPath="Cameras & Camcorders"
        [attributes]="hierarchicalMenuAttributes">
      </ng-ais-hierarchical-menu>
      <ng-ais-star-rating attributeName="rating"></ng-ais-star-rating>
    </ng-ais-instantsearch>
  `
})
export class AppComponent {
  public config = {
    apiKey: "6be0576ff61c053d5f9a3225e2a90f76",
    appId: "latency",
    indexName: "instant_search",
    urlSync: true
  };

  public items = [
    { value: 10, label: "10 hits per page", default: true },
    { value: 20, label: "20 hits per page" },
    { value: 30, label: "30 hits per page" }
  ];

  public indices = [
    { name: "instant_search", label: "Most relevant" },
    { name: "instant_search_price_asc", label: "Lowest price" },
    { name: "instant_search_price_desc", label: "Highest price" }
  ];

  public numericSelectorOptions = [
    { label: "Default", value: 0 },
    { label: "Top 10", value: 9991 },
    { label: "Top 100", value: 9901 },
    { label: "Top 500", value: 9501 }
  ];

  public numericRefinementListOptions = [
    { name: "All" },
    { end: 4, name: "less than 4" },
    { start: 4, end: 4, name: "4" },
    { start: 5, end: 10, name: "between 5 and 10" },
    { start: 10, name: "more than 10" }
  ];

  public hierarchicalMenuAttributes = [
    "hierarchicalCategories.lvl0",
    "hierarchicalCategories.lvl1",
    "hierarchicalCategories.lvl2"
  ];
}
