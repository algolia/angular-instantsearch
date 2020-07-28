import { Component, Injector, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { simple } from 'instantsearch.js/es/lib/stateMappings';
import { createSSRSearchClient } from 'angular-instantsearch';
import * as qs from 'qs';

function ssrRouter(readUrl) {
  return {
    read() {
      const url = readUrl();
      return qs.parse(url.slice(url.lastIndexOf('?') + 1), {
        arrayLimit: 99,
      });
    },
    write(routeState) {
      if (typeof window === 'undefined') return;

      const url = this.createURL(routeState);
      const title = this.windowTitle && this.windowTitle(routeState);

      if (this.writeTimer) {
        window.clearTimeout(this.writeTimer);
      }

      this.writeTimer = window.setTimeout(() => {
        if (window.location.href !== url) {
          window.history.pushState(routeState, title || '', url);
        }
        this.writeTimer = undefined;
      }, this.writeDelay);
    },
    createURL(routeState) {
      const url = readUrl();

      // TODO: polyfill
      const urlO = new URL(url);

      const queryString = qs.stringify(routeState, { arrayLimit: 99 });

      urlO.search = queryString;

      return urlO.toString();
    },
    onUpdate(cb) {
      if (typeof window === 'undefined') return;

      this._onPopState = event => {
        const routeState = event.state;
        // On initial load, the state is read from the URL without
        // update. Therefore, the state object isn't present. In this
        // case, we fallback and read the URL.
        if (!routeState) {
          cb(this.read());
        } else {
          cb(routeState);
        }
      };
      window.addEventListener('popstate', this._onPopState);
    },
    dispose() {
      if (typeof window === 'undefined') return;

      window.removeEventListener('popstate', this._onPopState);
    },
  };
}

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <ais-instantsearch [config]="instantsearchConfig">
        <div class="jumbotron">
          <p class="text-center">
            <ais-search-box placeholder="Search a product"></ais-search-box>
          </p>

          <div class="row">
            <div class="col-4">
              <ais-hierarchical-menu
                header="Show results for"
                [attributes]="['hierarchicalCategories.lvl0', 'hierarchicalCategories.lvl1', 'hierarchicalCategories.lvl2']"
                [sortBy]="['name:asc']"
              >
              </ais-hierarchical-menu>
            </div>

            <div class="col-4">
              <ais-refinement-list
                header="Brands"
                attribute="brand"
                operator="or"
                limit="10"
              >
              </ais-refinement-list>
            </div>

            <div class="col-4">
              <ais-sort-by
                header="Sort by"
                [items]="
                  [
                    {value: 'instant_search', label: 'Featured'},
                    {value: 'instant_search_price_asc', label: 'Price asc.'},
                    {value: 'instant_search_price_desc', label: 'Price desc.'}
                  ]
                "
              >
              </ais-sort-by>
            </div>
          </div>
        </div>
        <ais-hits></ais-hits>
        <hr>
        <ais-pagination></ais-pagination>
      </ais-instantsearch>
    </div>
  `,
  styles: [],
})
export class AppComponent {
  public instantsearchConfig: {};

  constructor(
    private httpClient: HttpClient,
    private transferState: TransferState,
    private injector: Injector,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    const routing = {
      router: ssrRouter(() => {
        if (isPlatformServer(this.platformId)) {
          const req = this.injector.get('request');
          return req.url;
        }
        return window.location.href;
      }),
      stateMapping: simple(),
    };

    this.instantsearchConfig = {
      indexName: 'instant_search',
      routing,
      searchClient: createSSRSearchClient({
        appId: 'latency',
        apiKey: '6be0576ff61c053d5f9a3225e2a90f76',
        makeStateKey,
        HttpHeaders,
        transferState: this.transferState,
        httpClient: this.httpClient,
      }),
    };
  }
}
