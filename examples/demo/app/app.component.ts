import { Component } from "@angular/core";

@Component({
  selector: "ngis-app",
  template: `
    <ngis-instantsearch [config]="config">
      <h1>Angular InstantSearch demo</h1>
      <ngis-hits-per-page-selector [items]="items"></ngis-hits-per-page-selector>
      <ngis-sort-by-selector [indices]="indices"></ngis-sort-by-selector>
      <ngis-search-box></ngis-search-box>
      <ngis-clear-all></ngis-clear-all>
      <ngis-hits></ngis-hits>
      <ngis-pagination></ngis-pagination>
      <ngis-numeric-refinement-list
        attributeName="price"
        [options]="numericRefinementListOptions"
      >
      </ngis-numeric-refinement-list>
      <ngis-menu
        attributeName="categories"
        limit="{{5}}"
        showMoreLimit="{{10}}"
      ></ngis-menu>
      <ngis-refinement-list attributeName="brand" limit="10"></ngis-refinement-list>
      <ngis-numeric-selector
        attributeName="popularity"
        operator=">="
        [options]="numericSelectorOptions"
      >
      </ngis-numeric-selector>
      <ngis-toggle
        attributeName="free_shipping"
        label="Free Shipping (toggle single value)"
      >
      </ngis-toggle>
      <ngis-price-ranges attributeName="price"></ngis-price-ranges>
      <ngis-current-refined-values></ngis-current-refined-values>
      <ngis-stats></ngis-stats>
    </ngis-instantsearch>
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
}
