import { NgModule, Component } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { NgAisModule } from "angular-instantsearch";

type Helper = {
  search: Function;
  addDisjunctiveFacetRefinement: Function;
};

export function wrapWithHits({
  template,
  styles = "",
  searchParameters = {},
  methods = {},
  searchFunction,
  searchClient,
  appDeclarations = []
}: {
  template: string;
  styles?: string;
  searchParameters?: {};
  methods?: {};
  searchFunction?: (helper: Helper) => void;
  searchClient?: {};
  appDeclarations?: any[];
}) {
  return (container: Element) => {
    @Component({
      selector: "ais-app",
      template: `
      <ais-instantsearch [config]="config">
        <div id="widget-display">
          ${template}
        </div>
        <div id="results-display">
          <div id="results-search-box-container">
            <ais-search-box
              placeholder="Search into furnitures"
            >
            </ais-search-box>
          </div>
          <div id="results-hits-container">
            <ais-hits>
              <ng-template let-hits="hits">
                <div
                  *ngFor="let hit of hits"
                  class="hit"
                  id="hit-{{hit.objectID}}"
                >
                  <div class="hit-picture">
                    <img [src]="hit.image" />
                  </div>

                  <div class="hit-content">
                    <div>
                      <ais-highlight [hit]="hit" attribute="name"></ais-highlight>
                      <span>\${{hit.price}}</span>
                      <span>{{hit.rating}} stars</span>
                    </div>

                    <div class="hit-description">
                      <ais-highlight
                        [hit]="hit"
                        attribute="description"
                      >
                      </ais-highlight>
                    </div>
                  </div>
                </div>
              </ng-template>
            </ais-hits>
          </div>
          <div id="results-pagination-container">
            <ais-pagination [totalPages]="20"></ais-pagination>
          </div>
        </div>
      </ais-instantsearch>
    `,
      styles: [
        styles,
        `
        #widget-display {
          border: solid 1px #E4E4E4;
          border-radius: 5px 5px 0 0;
          border-bottom: none;
          margin: 5px 5px 0 5px;
          min-height: 200px;
          padding: 50px 40px 40px;
        }

        #results-display {
          border: solid 1px #E4E4E4;
          border-radius: 0 0 5px 5px;
          display: flex;
          flex-direction: column;
          margin: 0 5px 5px 5px;
          min-height: 200px;
          padding: 50px 40px 40px;
        }

        #results-display .hit {
          align-items: center;
          display: flex;
          margin: 10px 10px;
        }

        #results-display .hit .hit-picture img {
          height: auto;
          width: 80px;
        }

        #results-display .hit .hit-content {
          padding: 0 10px;
        }
      `
      ]
    })
    class AppComponent {
      config = {
        ...(!searchClient && {
          appId: "latency",
          apiKey: "6be0576ff61c053d5f9a3225e2a90f76"
        }),
        searchFunction,
        searchClient,
        indexName: "instant_search",
        searchParameters: {
          hitsPerPage: 3,
          ...searchParameters
        }
      };

      constructor() {
        Object.keys(methods).forEach(methodName => {
          this[methodName] = methods[methodName];
        });
      }
    }

    @NgModule({
      bootstrap: [AppComponent],
      declarations: [AppComponent, ...appDeclarations],
      imports: [BrowserModule, NgAisModule.forRoot()],
      providers: []
    })
    class NgApp {}

    container.innerHTML = "<ais-app></ais-app>";
    platformBrowserDynamic().bootstrapModule(NgApp);
  };
}
