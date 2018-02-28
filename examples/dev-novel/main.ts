import { enableProdMode } from "@angular/core";
import { start, storiesOf } from "dev-novel";

import { wrapWithHits } from "./wrap-with-hits";
import { MenuSelect } from "./custom-widgets";

// depending on the env mode, enable prod mode or add debugging modules
if (process.env.ENV === "build") {
  enableProdMode();
}

storiesOf("InstantSearch").add(
  "searchFunction with forced refinement",
  wrapWithHits({
    template: `
      <ng-ais-panel header="Brand">
        <ng-ais-refinement-list
          attribute="brand"
          operator="or"
          [limit]="10"
        >
        </ng-ais-refinement-list>
      </ng-ais-panel>
    `,
    searchParameters: {
      disjunctiveFacetsRefinements: { brand: ["Apple"] },
      disjunctiveFacets: ["brand"]
    },
    searchFunction: helper => {
      helper.addDisjunctiveFacetRefinement("brand", "Apple");
      helper.search();
    }
  })
);

storiesOf("Breadcrumb").add(
  "default",
  wrapWithHits({
    template: `
      <ng-ais-breadcrumb
        [attributes]="[
          'hierarchicalCategories.lvl0',
          'hierarchicalCategories.lvl1',
          'hierarchicalCategories.lvl2'
        ]"
      >
      </ng-ais-breadcrumb>
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
    "with panel header",
    wrapWithHits({
      template: `
        <ng-ais-panel header='Current refinements'>
          <ng-ais-current-refinements></ng-ais-current-refinements>
        </ng-ais-panel>
      `,
      searchParameters: {
        disjunctiveFacetsRefinements: { brand: ["Apple", "Samsung"] },
        disjunctiveFacets: ["brand"],
        numericRefinements: { price: { ">=": [100] } }
      }
    })
  )
  .add(
    "with panel header but no refinements",
    wrapWithHits({
      template: `
        <ng-ais-panel header='Current refinements'>
          <ng-ais-current-refinements>
          </ng-ais-current-refinements>
        </ng-ais-panel>
      `
    })
  )
  .add(
    "with clearsQuery",
    wrapWithHits({
      template: `
        <ng-ais-panel header='Current refinements'>
          <ng-ais-current-refinements [clearsQuery]="true">
          </ng-ais-current-refinements>
        </ng-ais-panel>
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

storiesOf("Hits").add(
  "default",
  wrapWithHits({
    template: "<ng-ais-hits></ng-ais-hits>"
  })
);

storiesOf("HitsPerPage")
  .add(
    "default",
    wrapWithHits({
      template: `
      <ng-ais-hits-per-page
        [items]="[
          { value: 3, label: '3 per page' },
          { value: 5, label: '5 per page' },
          { value: 10, label: '10 per page' }
        ]"
      >
      </ng-ais-hits-per-page>
    `
    })
  )
  .add(
    "with default to 5",
    wrapWithHits({
      template: `
        <ng-ais-hits-per-page
          [items]="[
            { value: 3, label: '3 per page' },
            { value: 5, label: '5 per page', default: true },
            { value: 10, label: '10 per page' }
          ]"
        >
        </ng-ais-hits-per-page>
      `
    })
  );

storiesOf("InfiniteHits")
  .add(
    "default",
    wrapWithHits({
      template: "<ng-ais-infinite-hits></ng-ais-infinite-hits>"
    })
  )
  .add(
    "with custom template",
    wrapWithHits({
      template: `
        <ng-ais-infinite-hits>
          <ng-template
            let-hits="hits"
            let-showMore="showMore"
          >
            <div *ngFor="let hit of hits">
              <strong>{{hit.name}}</strong>
            </div>
            <button (click)="showMore()">Load more</button>
          </ng-template>
        </ng-ais-infinite-hits>
      `
    })
  );

storiesOf("Menu")
  .add(
    "default",
    wrapWithHits({
      template: '<ng-ais-menu attribute="categories"></ng-ais-menu>'
    })
  )
  .add(
    "with showMore and panel header",
    wrapWithHits({
      template: `
        <ng-ais-panel header="Categories">
          <ng-ais-menu
            attribute="categories"
            [limit]="3"
            [showMoreLimit]="10"
          >
          </ng-ais-menu>
        </ng-ais-panel>
      `
    })
  );

storiesOf("NumericMenu").add(
  "default with panel header",
  wrapWithHits({
    template: `
      <ng-ais-panel header="Numeric menu (price)">
        <ng-ais-numeric-menu
          attribute="price"
          operator="or"
          [items]="[
            { name: 'All' },
            { end: 4, name: 'less than 4' },
            { start: 4, end: 4, name: '4' },
            { start: 5, end: 10, name: 'between 5 and 10' },
            { start: 10, name: 'more than 10' }
          ]"
        >
        </ng-ais-numeric-menu>
      </ng-ais-panel>
    `
  })
);

storiesOf("NumericSelector")
  .add(
    "default",
    wrapWithHits({
      template: `
        <ng-ais-numeric-selector
          attribute="popularity"
          operator=">="
          [items]="[
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
          attribute="rating"
          operator="="
          [items]="[
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
    "default with panel header",
    wrapWithHits({
      template: `
        <ng-ais-panel header="Brand">
          <ng-ais-refinement-list
            attribute="brand"
            operator="or"
            [limit]="10"
          >
          </ng-ais-refinement-list>
        </ng-ais-panel>
      `
    })
  )
  .add(
    "panel header with showMore",
    wrapWithHits({
      template: `
        <ng-ais-panel header="Brand with show more">
          <ng-ais-refinement-list
            attribute="brand"
            operator="or"
            [limit]="3"
            [showMoreLimit]="10"
          >
          </ng-ais-refinement-list>
        </ng-ais-panel>
      `
    })
  )
  .add(
    "panel header with search inside the items",
    wrapWithHits({
      template: `
        <ng-ais-panel header="Searchable brands">
          <ng-ais-refinement-list
            attribute="brand"
            operator="or"
            searchPlaceholder="Find other brands..."
            [searchable]="true"
            [limit]="10"
          >
          </ng-ais-refinement-list>
        </ng-ais-panel>
      `
    })
  )
  .add(
    "panel header with operator `and`",
    wrapWithHits({
      template: `
        <ng-ais-panel header="Price ranges">
          <ng-ais-refinement-list
            attribute="price_range"
            operator="and"
            [limit]="10"
            [transformItems]="transformItems"
          >
          </ng-ais-refinement-list>
        </ng-ais-panel>
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
        [items]="[
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
  "default with panel header",
  wrapWithHits({
    template: `
      <ng-ais-panel header="Rating">
        <ng-ais-rating-menu
          attribute="rating"
          [max]="5"
        >
        </ng-ais-rating-menu>
      </ng-ais-panel>
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
          attribute="free_shipping"
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
          attribute="brand"
          [values]="{
            on: 'Sony',
            off: 'Canon'
          }"
        >
        </ng-ais-toggle>
      `
    })
  );

storiesOf("RangeInput").add(
  "default",
  wrapWithHits({
    template: `
      <ng-ais-range-input attribute="price">
      </ng-ais-range-input>
    `
  })
);

storiesOf("CustomWidgets").add(
  "MenuSelect",
  wrapWithHits({
    template: `<ng-ais-menu-select></ng-ais-menu-select>`,
    appDeclarations: [MenuSelect]
  })
);

storiesOf("RangeSlider").add(
  "default",
  wrapWithHits({
    template: `
      <ng-ais-range-slider attribute="price">
      </ng-ais-range-slider>
    `
  })
);

start({
  projectName: "Angular InstantSearch",
  projectLink: "https://github.com/algolia/angular-instantsearch"
});
