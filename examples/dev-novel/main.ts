import { enableProdMode } from "@angular/core";
import { start, storiesOf } from "dev-novel";
import * as algoliasearch from "algoliasearch";

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
      <ais-panel header="Brand">
        <ais-refinement-list
          attribute="brand"
          operator="or"
          [limit]="10"
        >
        </ais-refinement-list>
      </ais-panel>
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

storiesOf("InstantSearch").add(
  "with algoliasearch search client",
  wrapWithHits({
    template: "",
    searchClient: algoliasearch("latency", "6be0576ff61c053d5f9a3225e2a90f76")
  })
);

storiesOf("InstantSearch").add(
  "with custom search client",
  wrapWithHits({
    template: "",
    searchClient: {
      search(requests) {
        return Promise.resolve({
          results: [
            {
              hits: [
                {
                  objectID: "1",
                  image:
                    "https://cdn-demo.algolia.com/bestbuy-0118/5477500_sb.jpg",
                  price: "99.99",
                  rating: 4,
                  description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nunc lacus, vestibulum non rutrum a, dapibus interdum magna. Quisque semper orci erat, id placerat nunc convallis at. Praesent commodo, elit non fermentum blandit, augue dolor cursus metus, eu auctor leo erat sit amet ante. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
                  _highlightResult: {
                    name: {
                      value: "Fake Result 1"
                    }
                  }
                },
                {
                  objectID: "2",
                  image:
                    "https://cdn-demo.algolia.com/bestbuy-0118/4397400_sb.jpg",
                  price: "39.99",
                  rating: 3,
                  description:
                    "Morbi pretium urna et massa maximus maximus. Nunc risus lectus, mattis non malesuada quis, pretium eget ligula. Sed vulputate mauris congue, tempor velit et, pretium felis. Ut ullamcorper et ligula et congue. Nunc consequat massa massa. Etiam eu purus lorem. Ut bibendum nisi nec sapien imperdiet, vel laoreet velit porttitor.",
                  _highlightResult: {
                    name: {
                      value: "Fake Result 2"
                    }
                  }
                }
              ]
            }
          ]
        });
      }
    }
  })
);

storiesOf("Breadcrumb").add(
  "default",
  wrapWithHits({
    template: `
      <ais-breadcrumb
        [attributes]="[
          'hierarchicalCategories.lvl0',
          'hierarchicalCategories.lvl1',
          'hierarchicalCategories.lvl2'
        ]"
      >
      </ais-breadcrumb>
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
      template: "<ais-clear-refinements></ais-clear-refinements>",
      searchParameters: {
        disjunctiveFacetsRefinements: { brand: ["Apple"] },
        disjunctiveFacets: ["brand"]
      }
    })
  )
  .add(
    "with nothing to clear",
    wrapWithHits({
      template: "<ais-clear-refinements></ais-clear-refinements>"
    })
  )
  .add(
    "with clear refinements and query",
    wrapWithHits({
      template:
        "<ais-clear-refinements [clearsQuery]='true'></ais-clear-refinements>",
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
      template: "<ais-current-refinements></ais-current-refinements>",
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
        <ais-panel header='Current refinements'>
          <ais-current-refinements></ais-current-refinements>
        </ais-panel>
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
        <ais-panel header='Current refinements'>
          <ais-current-refinements>
          </ais-current-refinements>
        </ais-panel>
      `
    })
  )
  .add(
    "with clearsQuery",
    wrapWithHits({
      template: `
        <ais-panel header='Current refinements'>
          <ais-current-refinements [clearsQuery]="true">
          </ais-current-refinements>
        </ais-panel>
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
    <ais-hierarchical-menu
      [attributes]="[
        'hierarchicalCategories.lvl0',
        'hierarchicalCategories.lvl1',
        'hierarchicalCategories.lvl2'
      ]"
    >
    </ais-hierarchical-menu>
  `
    })
  )
  .add(
    "hide parent level",
    wrapWithHits({
      template: `
        <ais-hierarchical-menu
          [showParentLevel]="false"
          [attributes]="[
            'hierarchicalCategories.lvl0',
            'hierarchicalCategories.lvl1',
            'hierarchicalCategories.lvl2'
          ]"
        >
        </ais-hierarchical-menu>
      `
    })
  )
  .add(
    "with default selected item",
    wrapWithHits({
      template: `
        <ais-hierarchical-menu
          [attributes]="[
            'hierarchicalCategories.lvl0',
            'hierarchicalCategories.lvl1',
            'hierarchicalCategories.lvl2'
          ]"
        >
        </ais-hierarchical-menu>
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
    template: "<ais-hits></ais-hits>"
  })
);

storiesOf("HitsPerPage")
  .add(
    "default",
    wrapWithHits({
      template: `
      <ais-hits-per-page
        [items]="[
          { value: 3, label: '3 per page' },
          { value: 5, label: '5 per page' },
          { value: 10, label: '10 per page' }
        ]"
      >
      </ais-hits-per-page>
    `
    })
  )
  .add(
    "with default to 5",
    wrapWithHits({
      template: `
        <ais-hits-per-page
          [items]="[
            { value: 3, label: '3 per page' },
            { value: 5, label: '5 per page', default: true },
            { value: 10, label: '10 per page' }
          ]"
        >
        </ais-hits-per-page>
      `
    })
  );

storiesOf("InfiniteHits")
  .add(
    "default",
    wrapWithHits({
      template: "<ais-infinite-hits></ais-infinite-hits>"
    })
  )
  .add(
    "with custom template",
    wrapWithHits({
      template: `
        <ais-infinite-hits>
          <ng-template
            let-hits="hits"
            let-showMore="showMore"
          >
            <div *ngFor="let hit of hits">
              <strong>{{hit.name}}</strong>
            </div>
            <button (click)="showMore()">Load more</button>
          </ng-template>
        </ais-infinite-hits>
      `
    })
  );

storiesOf("Menu")
  .add(
    "default",
    wrapWithHits({
      template: '<ais-menu attribute="categories"></ais-menu>'
    })
  )
  .add(
    "with showMore and panel header",
    wrapWithHits({
      template: `
        <ais-panel header="Categories">
          <ais-menu
            attribute="categories"
            [limit]="3"
            [showMoreLimit]="10"
          >
          </ais-menu>
        </ais-panel>
      `
    })
  );

storiesOf("NumericMenu").add(
  "default with panel header",
  wrapWithHits({
    template: `
      <ais-panel header="Numeric menu (price)">
        <ais-numeric-menu
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
        </ais-numeric-menu>
      </ais-panel>
    `
  })
);

storiesOf("NumericSelector")
  .add(
    "default",
    wrapWithHits({
      template: `
        <ais-numeric-selector
          attribute="popularity"
          operator=">="
          [items]="[
            { label: 'Default', value: 0 },
            { label: 'Top 10', value: 21459 },
            { label: 'Top 100', value: 21369 },
            { label: 'Top 500', value: 20969 }
          ]"
        >
        </ais-numeric-selector>
      `
    })
  )
  .add(
    "with default value",
    wrapWithHits({
      template: `
        <ais-numeric-selector
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
        </ais-numeric-selector>
      `
    })
  );

storiesOf("Pagination").add(
  "default",
  wrapWithHits({
    template: "<ais-pagination></ais-pagination>"
  })
);

storiesOf("RefinementList")
  .add(
    "default with panel header",
    wrapWithHits({
      template: `
        <ais-panel header="Brand">
          <ais-refinement-list
            attribute="brand"
            operator="or"
            [limit]="10"
          >
          </ais-refinement-list>
        </ais-panel>
      `
    })
  )
  .add(
    "panel header with showMore",
    wrapWithHits({
      template: `
        <ais-panel header="Brand with show more">
          <ais-refinement-list
            attribute="brand"
            operator="or"
            [limit]="3"
            [showMoreLimit]="10"
          >
          </ais-refinement-list>
        </ais-panel>
      `
    })
  )
  .add(
    "panel header with search inside the items",
    wrapWithHits({
      template: `
        <ais-panel header="Searchable brands">
          <ais-refinement-list
            attribute="brand"
            operator="or"
            searchPlaceholder="Find other brands..."
            [searchable]="true"
            [limit]="10"
          >
          </ais-refinement-list>
        </ais-panel>
      `
    })
  )
  .add(
    "panel header with operator `and`",
    wrapWithHits({
      template: `
        <ais-panel header="Price ranges">
          <ais-refinement-list
            attribute="price_range"
            operator="and"
            [limit]="10"
            [transformItems]="transformItems"
          >
          </ais-refinement-list>
        </ais-panel>
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
        "<ais-search-box placeholder='Search for products'></ais-search-box>"
    })
  )
  .add(
    "search on enter",
    wrapWithHits({
      template: `
        <ais-search-box
          placeholder="Search for products"
          [searchAsYouType]="false"
        >
        </ais-search-box>
      `
    })
  );

storiesOf("SortBy").add(
  "default",
  wrapWithHits({
    template: `
      <ais-sort-by
        [items]="[
          { name: 'instant_search', label: 'Most relevant' },
          { name: 'instant_search_price_asc', label: 'Lowest price' },
          { name: 'instant_search_price_desc', label: 'Highest price' }
        ]"
      >
      </ais-sort-by>
    `
  })
);

storiesOf("RatingMenu").add(
  "default with panel header",
  wrapWithHits({
    template: `
      <ais-panel header="Rating">
        <ais-rating-menu
          attribute="rating"
          [max]="5"
        >
        </ais-rating-menu>
      </ais-panel>
    `
  })
);

storiesOf("Stats").add(
  "default",
  wrapWithHits({
    template: "<ais-stats></ais-stats>"
  })
);

storiesOf("Toggle")
  .add(
    "with single value",
    wrapWithHits({
      template: `
        <ais-toggle
          label="Free Shipping (toggle single value)"
          attribute="free_shipping"
        >
        </ais-toggle>
      `
    })
  )
  .add(
    "with on & off values",
    wrapWithHits({
      template: `
        <ais-toggle
          label="Canon (not checked) or Sony (checked)"
          attribute="brand"
          [values]="{
            on: 'Sony',
            off: 'Canon'
          }"
        >
        </ais-toggle>
      `
    })
  );

storiesOf("RangeInput").add(
  "default",
  wrapWithHits({
    template: `
      <ais-range-input attribute="price">
      </ais-range-input>
    `
  })
);

storiesOf("CustomWidgets").add(
  "MenuSelect",
  wrapWithHits({
    template: `<ais-menu-select></ais-menu-select>`,
    appDeclarations: [MenuSelect]
  })
);

storiesOf("RangeSlider").add(
  "default",
  wrapWithHits({
    template: `
      <ais-range-slider attribute="price">
      </ais-range-slider>
    `
  })
);

storiesOf("Configure").add(
  "with 1 hit per page",
  wrapWithHits({
    template: `
      <p>This widget renders nothing, here we are forcing hitsPerPage to 1</p>
      <ais-configure [searchParameters]="{ hitsPerPage: 1 }">
      </ais-configure>
    `
  })
);

start({
  projectName: "Angular InstantSearch",
  projectLink: "https://github.com/algolia/angular-instantsearch"
});
