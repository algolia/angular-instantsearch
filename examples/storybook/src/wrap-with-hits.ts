import { Component } from '@angular/core';

type Helper = {
  search: Function;
  addDisjunctiveFacetRefinement: Function;
};

type WrapWithHitsParams = {
  template: string;
  styles?: string;
  searchParameters?: {};
  methods?: {};
  searchFunction?: (helper: Helper) => void;
  searchClient?: {};
  filters?: string;
  indexName?: string;
  hits?: string;
  routing?: {};
};

const defaultHits = `
<ng-template let-hits="hits">
  <ol class="playground-hits">
    <li
      *ngFor="let hit of hits"
      class="hit playground-hits-item"
      id="hit-{{hit.objectID}}"
    >
      <div class="playground-hits-image" [ngStyle]="{'background-image': 'url(' + hit.image + ')' }">
      </div>

      <div class="playground-hits-desc">
        <p>
          <ais-highlight [hit]="hit" attribute="name"></ais-highlight>
        </p>
        <p>Rating: {{hit.rating}} ✭</p>
        <p>Price: \${{hit.price}}</p>
      </div>
    </li>
  </ol>
</ng-template>
`;

export function wrapWithHits({
  template,
  styles = '',
  searchParameters = {},
  methods = {},
  searchFunction,
  searchClient,
  indexName = 'instant_search',
  filters = `<ais-refinement-list attribute="brand"></ais-refinement-list>`,
  hits = defaultHits,
  routing,
}: WrapWithHitsParams) {
  @Component({
    selector: 'ais-app',
    template: `
      <ais-instantsearch [config]="config">
        <div class="ais-container ais-container-preview">
          ${template}
        </div>
        <div class="ais-container ais-container-playground">
          <div class="panel-left">
            ${filters}
          </div>
          <div class="panel-right">
            <ais-search-box placeholder="Search into furniture"></ais-search-box>
            <ais-stats></ais-stats>
            <ais-hits>
              ${hits}
            </ais-hits>
            <ais-pagination [totalPages]="20"></ais-pagination>
          </div>
        </div>
      </ais-instantsearch>
    `,
  })
  class AppComponent {
    config = {
      ...(!searchClient && {
        appId: 'latency',
        apiKey: '6be0576ff61c053d5f9a3225e2a90f76',
      }),
      searchFunction,
      searchClient,
      indexName,
      searchParameters: {
        hitsPerPage: 3,
        ...searchParameters,
      },
      routing,
    };

    constructor() {
      Object.keys(methods).forEach(methodName => {
        this[methodName] = methods[methodName];
      });
    }
  }

  return AppComponent;
}
