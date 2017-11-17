import { enableProdMode } from "@angular/core";
import { start, storiesOf } from "dev-novel";

import { wrapWithHits } from "./wrap-with-hits";

// depending on the env mode, enable prod mode or add debugging modules
if (process.env.ENV === "build") {
  enableProdMode();
}

storiesOf("ClearRefinements")
  .add(
    "default",
    wrapWithHits({
      template: "<ng-ais-clear-refinements></ng-ais-clear-refinements>",
      searchParameters: {
        disjunctiveFacetsRefinements: { brand: ["Apple"] },
        disjunctiveFacets: ["brand"]
      }
    })
  )
  .add(
    "with nothing to clear",
    wrapWithHits({
      template: "<ng-ais-clear-refinements></ng-ais-clear-refinements>"
    })
  )
  .add(
    "with clear refinements and query",
    wrapWithHits({
      template:
        "<ng-ais-clear-refinements [clearsQuery]='true'></ng-ais-clear-refinements>",
      searchParameters: {
        disjunctiveFacetsRefinements: { brand: ["Apple"] },
        disjunctiveFacets: ["brand"]
      }
    })
  );

storiesOf("CurrentRefinements")
  .add(
    "default",
    wrapWithHits({
      template: "<ng-ais-current-refinements></ng-ais-current-refinements>",
      searchParameters: {
        disjunctiveFacetsRefinements: { brand: ["Apple", "Samsung"] },
        disjunctiveFacets: ["brand"],
        numericRefinements: { price: { ">=": [100] } }
      }
    })
  )
  .add(
    "with header",
    wrapWithHits({
      template: `
        <ng-ais-current-refinements header='Current refinements'>
        </ng-ais-current-refinements>
      `,
      searchParameters: {
        disjunctiveFacetsRefinements: { brand: ["Apple", "Samsung"] },
        disjunctiveFacets: ["brand"],
        numericRefinements: { price: { ">=": [100] } }
      }
    })
  )
  .add(
    "with header but no refinements",
    wrapWithHits({
      template: `
        <ng-ais-current-refinements header='Current refinements'>
        </ng-ais-current-refinements>
      `
    })
  )
  .add(
    "with clearsQuery",
    wrapWithHits({
      template: `
        <ng-ais-current-refinements header='Current refinements' [clearsQuery]="true">
        </ng-ais-current-refinements>
      `,
      searchParameters: {
        disjunctiveFacetsRefinements: { brand: ["Apple", "Samsung"] },
        disjunctiveFacets: ["brand"],
        numericRefinements: { price: { ">=": [100] } }
      }
    })
  );

storiesOf("HierarchicalMenu")
  .add(
    "default",
    wrapWithHits({
      template: `
    <ng-ais-hierarchical-menu
      [attributes]="[
        'hierarchicalCategories.lvl0',
        'hierarchicalCategories.lvl1',
        'hierarchicalCategories.lvl2'
      ]"
    >
    </ng-ais-hierarchical-menu>
  `
    })
  )
  .add(
    "hide parent level",
    wrapWithHits({
      template: `
        <ng-ais-hierarchical-menu
          [showParentLevel]="false"
          [attributes]="[
            'hierarchicalCategories.lvl0',
            'hierarchicalCategories.lvl1',
            'hierarchicalCategories.lvl2'
          ]"
        >
        </ng-ais-hierarchical-menu>
      `
    })
  )
  .add(
    "with default selected item",
    wrapWithHits({
      template: `
        <ng-ais-hierarchical-menu
          [attributes]="[
            'hierarchicalCategories.lvl0',
            'hierarchicalCategories.lvl1',
            'hierarchicalCategories.lvl2'
          ]"
        >
        </ng-ais-hierarchical-menu>
      `,
      searchParameters: {
        hierarchicalFacetsRefinements: {
          "hierarchicalCategories.lvl0": [
            "Cameras & Camcorders > Digital Cameras"
          ]
        }
      }
    })
  );

storiesOf("Results").add(
  "default",
  wrapWithHits({
    template: "<ng-ais-results></ng-ais-results>"
  })
);

storiesOf("ResultsPerPage")
  .add(
    "default",
    wrapWithHits({
      template: `
      <ng-ais-results-per-page
        [items]="[
          { value: 3, label: '3 per page' },
          { value: 5, label: '5 per page' },
          { value: 10, label: '10 per page' }
        ]"
      >
      </ng-ais-results-per-page>
    `
    })
  )
  .add(
    "with default to 5",
    wrapWithHits({
      template: `
        <ng-ais-results-per-page
          [items]="[
            { value: 3, label: '3 per page' },
            { value: 5, label: '5 per page', default: true },
            { value: 10, label: '10 per page' }
          ]"
        >
        </ng-ais-results-per-page>
      `
    })
  );

storiesOf("InfiniteResults").add(
  "default",
  wrapWithHits({
    template: "<ng-ais-infinite-results></ng-ais-infinite-results>"
  })
);

storiesOf("Menu")
  .add(
    "default",
    wrapWithHits({
      template: '<ng-ais-menu attributeName="categories"></ng-ais-menu>'
    })
  )
  .add(
    "with showMore and header",
    wrapWithHits({
      template: `
        <ng-ais-menu
          header="Categories"
          attributeName="categories"
          [limitMin]="3"
          [limitMax]="10"
        >
        </ng-ais-menu>
      `
    })
  );

storiesOf("MenuSelect").add(
  "default",
  wrapWithHits({
    template:
      '<ng-ais-menu-select attributeName="categories"></ng-ais-menu-select>'
  })
);

storiesOf("NumericMenu").add(
  "default",
  wrapWithHits({
    template: `
      <ng-ais-numeric-menu
        header="Numeric menu (price)"
        attributeName="price"
        operator="or"
        [options]="[
          { name: 'All' },
          { end: 4, name: 'less than 4' },
          { start: 4, end: 4, name: '4' },
          { start: 5, end: 10, name: 'between 5 and 10' },
          { start: 10, name: 'more than 10' }
        ]"
      >
      </ng-ais-numeric-menu>
    `
  })
);

storiesOf("NumericSelector")
  .add(
    "default",
    wrapWithHits({
      template: `
        <ng-ais-numeric-selector
          operator=">="
          attributeName="popularity"
          [options]="[
            { label: 'Default', value: 0 },
            { label: 'Top 10', value: 21459 },
            { label: 'Top 100', value: 21369 },
            { label: 'Top 500', value: 20969 }
          ]"
        >
        </ng-ais-numeric-selector>
      `
    })
  )
  .add(
    "with default value",
    wrapWithHits({
      template: `
        <ng-ais-numeric-selector
          operator="="
          attributeName="rating"
          [options]="[
            { label: 'No rating selected', value: undefined },
            { label: 'Rating: 5', value: 5 },
            { label: 'Rating: 4', value: 4 },
            { label: 'Rating: 3', value: 3 },
            { label: 'Rating: 2', value: 2 },
            { label: 'Rating: 1', value: 1 }
          ]"
        >
        </ng-ais-numeric-selector>
      `
    })
  );

storiesOf("Pagination").add(
  "default",
  wrapWithHits({
    template: "<ng-ais-pagination></ng-ais-pagination>"
  })
);

storiesOf("RefinementList")
  .add(
    "default",
    wrapWithHits({
      template: `
        <ng-ais-refinement-list
          header="Brand"
          attributeName="brand"
          operator="or"
          [limitMin]="10"
        >
        </ng-ais-refinement-list>
      `
    })
  )
  .add(
    "with showMore",
    wrapWithHits({
      template: `
        <ng-ais-refinement-list
          header="Brand with show more"
          attributeName="brand"
          operator="or"
          [limitMin]="3"
          [limitMax]="10"
        >
        </ng-ais-refinement-list>
      `
    })
  )
  .add(
    "with search inside the items",
    wrapWithHits({
      template: `
        <ng-ais-refinement-list
          header="Searchable brands"
          attributeName="brand"
          operator="or"
          searchPlaceholder="Find other brands..."
          [withSearchBox]="true"
          [limitMin]="10"
        >
        </ng-ais-refinement-list>
      `
    })
  )
  .add(
    "with operator `and`",
    wrapWithHits({
      template: `
        <ng-ais-refinement-list
          header="Price ranges"
          attributeName="price_range"
          operator="and"
          [limitMin]="10"
          [transformItems]="transformItems"
        >
        </ng-ais-refinement-list>
      `,
      methods: {
        transformItems: items =>
          items.map(item => {
            item.highlighted = item.highlighted
              .replace(/(\d+) - (\d+)/, "$$$1 - $$$2")
              .replace(/> (\d+)/, "> $$$1");
            return item;
          })
      }
    })
  );

storiesOf("SearchBox")
  .add(
    "default",
    wrapWithHits({
      template:
        "<ng-ais-search-box placeholder='Search for products'></ng-ais-search-box>"
    })
  )
  .add(
    "search on enter",
    wrapWithHits({
      template: `
        <ng-ais-search-box
          placeholder="Search for products"
          [searchAsYouType]="false"
        >
        </ng-ais-search-box>
      `
    })
  );

storiesOf("SortBy").add(
  "default",
  wrapWithHits({
    template: `
      <ng-ais-sort-by
        [indices]="[
          { name: 'instant_search', label: 'Most relevant' },
          { name: 'instant_search_price_asc', label: 'Lowest price' },
          { name: 'instant_search_price_desc', label: 'Highest price' }
        ]"
      >
      </ng-ais-sort-by>
    `
  })
);

storiesOf("RatingMenu").add(
  "default",
  wrapWithHits({
    template: `
      <ng-ais-rating-menu
        header="Rating"
        attributeName="rating"
        [max]="5"
      >
      </ng-ais-rating-menu>
    `
  })
);

storiesOf("Stats").add(
  "default",
  wrapWithHits({
    template: "<ng-ais-stats></ng-ais-stats>"
  })
);

storiesOf("Toggle")
  .add(
    "with single value",
    wrapWithHits({
      template: `
        <ng-ais-toggle
          label="Free Shipping (toggle single value)"
          attributeName="free_shipping"
        >
        </ng-ais-toggle>
      `
    })
  )
  .add(
    "with on & off values",
    wrapWithHits({
      template: `
        <ng-ais-toggle
          label="Canon (not checked) or Sony (checked)"
          attributeName="brand"
          [values]="{
            on: 'Sony',
            off: 'Canon'
          }"
        >
        </ng-ais-toggle>
      `
    })
  );

start({
  projectName: "Angular InstantSearch",
  projectLink: "https://github.com/algolia/angular-instantsearch"
});
