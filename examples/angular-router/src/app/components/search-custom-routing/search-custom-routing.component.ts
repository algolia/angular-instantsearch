import { Component, OnDestroy } from '@angular/core';
import { InstantSearchConfig } from 'angular-instantsearch/instantsearch/instantsearch';
import history from 'instantsearch.js/es/lib/routers/history';

@Component({
  selector: 'app-search',
  template: `
    <ais-instantsearch
      [config]="config"
    >
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
                    {name: 'instant_search', label: 'Featured'},
                    {name: 'instant_search_price_asc', label: 'Price asc.'},
                    {name: 'instant_search_price_desc', label: 'Price desc.'}
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
export class SearchCustomRoutingComponent implements OnDestroy {
  public config: InstantSearchConfig = {
    appId: 'latency',
    apiKey: '6be0576ff61c053d5f9a3225e2a90f76',
    indexName: 'instant_search',
    routing: {
      router: history({
        windowTitle(routeState) {
          if (!routeState) return;
          return `Website / Find ${routeState.q} in ${
            routeState.brands
          } brands`;
        },
        createURL({ routeState, location }) {
          let baseUrl = location.href.split('/search-custom-routing/')[0];
          if (
            !routeState ||
            (!routeState.q && routeState.brands === 'all' && routeState.p === 1)
          ) {
            return baseUrl;
          }
          if (baseUrl[baseUrl.length - 1] !== '/') baseUrl += '/';
          const routeStateArray = [
            'q',
            encodeURIComponent(routeState.q),
            'brands',
            encodeURIComponent(routeState.brands),
            'p',
            routeState.p,
          ];

          return `${baseUrl}search-custom-routing/${routeStateArray.join('/')}`;
        },
        parseURL({ location }) {
          const routeStateString = location.href.split(
            '/search-custom-routing/'
          )[1];
          if (routeStateString === undefined) return {};
          const routeStateValues = routeStateString.match(
            /^q\/(.*?)\/brands\/(.*?)\/p\/(.*?)$/
          );
          return {
            q: decodeURIComponent(routeStateValues[1]),
            brands: decodeURIComponent(routeStateValues[2]),
            p: routeStateValues[3],
          };
        },
      }),
      stateMapping: {
        stateToRoute(uiState) {
          return {
            q: uiState.query || '',
            brands:
              (uiState.refinementList &&
                uiState.refinementList.brand &&
                uiState.refinementList.brand.join('~')) ||
              'all',
            p: uiState.page || 1,
          };
        },
        routeToState(routeState) {
          if (routeState.brands === 'all') routeState.brands = undefined;

          return {
            query: routeState.q,
            refinementList: {
              brand: routeState.brands && routeState.brands.split('~'),
            },
            page: routeState.p,
          };
        },
      },
    },
  };

  ngOnDestroy() {
    console.log('SearchCustomRoutingComponent::ngOnDestroy');
  }
}
