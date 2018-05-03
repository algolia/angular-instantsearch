import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
  Inject,
  PLATFORM_ID
} from "@angular/core";
import { isPlatformBrowser } from "@angular/common";

import * as algoliasearchProxy from "algoliasearch";
import instantsearch from "instantsearch.js/es";

import { Widget } from "../base-widget";
import { VERSION } from "../version";

const algoliasearch = algoliasearchProxy.default || algoliasearchProxy;

export type SearchRequest = {
  indexName: string;
  params: SearchParameters;
};

export type SearchForFacetValuesRequest = {
  indexName: string;
  params: SearchForFacetValuesParameters;
};

// Documentation: https://www.algolia.com/doc/api-reference/search-api-parameters/
export type Parameters = {
  // Attributes
  attributesToRetrieve?: string[];
  restrictSearchableAttributes?: string[];

  // Filtering
  filters?: string;
  facetFilters?: string[];
  optionalFilters?: string[];
  numericFilters?: string[];
  sumOrFiltersScores?: boolean;

  // Faceting
  facets?: string[];
  maxValuesPerFacet?: number;
  facetingAfterDistinct?: boolean;
  sortFacetValuesBy?: string;

  // Highlighting / Snippeting
  attributesToHighlight?: string[];
  attributesToSnippet?: string[];
  highlightPreTag?: string;
  highlightPostTag?: string;
  snippetEllipsisText?: string;
  restrictHighlightAndSnippetArrays?: boolean;

  // Pagination
  page?: number;
  hitsPerPage?: number;
  offset?: number;
  length?: number;

  // Typos
  minWordSizefor1Typo?: number;
  minWordSizefor2Typos?: number;
  typoTolerance?: string | boolean;
  allowTyposOnNumericTokens?: boolean;
  ignorePlurals?: boolean | string[];
  disableTypoToleranceOnAttributes?: string[];

  // Geo-Search
  aroundLatLng?: string;
  aroundLatLngViaIP?: boolean;
  aroundRadius?: number | "all";
  aroundPrecision?: number;
  minimumAroundRadius?: number;
  insideBoundingBox?: GeoRectangle | GeoRectangle[];
  insidePolygon?: GeoPolygon | GeoPolygon[];

  // Query Strategy
  queryType?: string;
  removeWordsIfNoResults?: string;
  advancedSyntax?: boolean;
  optionalWords?: string | string[];
  removeStopWords?: boolean | string[];
  disableExactOnAttributes?: string[];
  exactOnSingleWordQuery?: string;
  alternativesAsExact?: string[];

  // Query Rules
  enableRules?: boolean;
  ruleContexts?: string[];

  // Advanced
  minProximity?: number;
  responseFields?: string[];
  maxFacetHits?: number;
  percentileComputation?: boolean;
  distinct?: number | boolean;
  getRankingInfo?: boolean;
  clickAnalytics?: boolean;
  analytics?: boolean;
  analyticsTags?: string[];
  synonyms?: boolean;
  replaceSynonymsInHighlight?: boolean;
};

export interface SearchParameters extends Parameters {
  query: string;
};

export interface SearchForFacetValuesParameters extends Parameters {
  facetQuery: string;
  facetName: string;
};

export type GeoRectangle = [number, number, number, number];
export type GeoPolygon = [number, number, number, number, number, number];

// Documentation: https://www.algolia.com/doc/rest-api/search/?language=javascript#search-multiple-indexes
export type SearchResponse = {
  hits: Hit[];
  page?: number;
  nbHits?: number;
  nbPages?: number;
  hitsPerPage?: number;
  processingTimeMS?: number;
  query?: string;
  params?: string;
  index?: string;
};

export type Hit = {
  _highlightResult?: object;
}

// Documentation: https://www.algolia.com/doc/rest-api/search/?language=javascript#search-for-facet-values
export type SearchForFacetValuesResponse = {
  value: string;
  highlighted?: string;
  count?: number;
};

export type SearchClient = {
  search: (requests: SearchRequest[]) => Promise<{ results: SearchResponse[] }>;
  searchForFacetValues?: (
    requests: SearchForFacetValuesRequest[]
  ) => Promise<{ facetHits: SearchForFacetValuesResponse[] }>;
};

export type InstantSearchConfig = {
  appId?: string;
  apiKey?: string;
  indexName: string;

  numberLocale?: string;
  searchFunction?: () => void;
  createAlgoliaClient?: (
    algoliasearch: Function,
    appId: string,
    apiKey: string
  ) => object;
  searchClient?: SearchClient;
  searchParameters?: object | void;
  urlSync?:
    | boolean
    | {
        mapping?: object;
        threshold?: number;
        trackedParameters?: string[];
        useHash?: boolean;
        getHistoryState?: () => object;
      };
};

export class InstantSearchInstance {
  public start: () => void;

  public addWidget: (widget: Widget) => void;
  public addWidgets: (widgets: Widget[]) => void;

  public removeWidget: (widget: Widget) => void;
  public removeWidgets: (widgets: Widget[]) => void;

  // EventEmmiter
  public on: (eventName: string, callback: Function) => void;
  public removeListener: (eventName: string, callback: Function) => void;

  public helper: {
    lastResults: Object;
    state: Object;
  };

  public dispose: () => void;
}

@Component({
  selector: "ais-instantsearch",
  template: `<ng-content></ng-content>`
})
export class NgAisInstantSearch implements AfterViewInit, OnInit, OnDestroy {
  @Input() public config: InstantSearchConfig;
  @Input() public instanceName: string = "default";

  @Output()
  change: EventEmitter<{ results: {}; state: {} }> = new EventEmitter<{
    results: {};
    state: {};
  }>();

  public instantSearchInstance: InstantSearchInstance;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  public ngOnInit() {
    this.createInstantSearchInstance(this.config);
  }

  public ngAfterViewInit() {
    this.instantSearchInstance.start();
  }

  public ngOnDestroy() {
    this.instantSearchInstance.removeListener("render", this.onRender);
    this.instantSearchInstance.dispose();
  }

  public createInstantSearchInstance(config: InstantSearchConfig) {
    // add default searchParameters with highlighting config
    if (!config.searchParameters) config.searchParameters = {};
    Object.assign(config.searchParameters, {
      highlightPreTag: "__ais-highlight__",
      highlightPostTag: "__/ais-highlight__"
    });

    // remove URLSync widget if on SSR
    if (!isPlatformBrowser(this.platformId)) {
      config.urlSync = false;
    }

    // custom algolia client agent
    if (!config.searchClient && !config.createAlgoliaClient) {
      const client = algoliasearch(config.appId, config.apiKey);
      client.addAlgoliaAgent(`angular-instantsearch ${VERSION}`);

      config.searchClient = client;
      config.appId = undefined;
      config.apiKey = undefined;
    }

    this.instantSearchInstance = instantsearch(config);
    this.instantSearchInstance.on("render", this.onRender);
  }

  public addWidget(widget: Widget) {
    this.instantSearchInstance.addWidget(widget);
  }

  public removeWidget(widget: Widget) {
    this.instantSearchInstance.removeWidget(widget);
  }

  onRender = () => {
    this.change.emit({
      results: this.instantSearchInstance.helper.lastResults,
      state: this.instantSearchInstance.helper.state
    });
  };
}
