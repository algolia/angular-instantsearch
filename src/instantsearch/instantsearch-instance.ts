import { Injectable, Inject, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";

import instantsearch from "instantsearch.js/es";

import { Widget } from "../base-widget";

export type InstantSearchConfig = {
  appId: string;
  apiKey: string;
  indexName: string;

  numberLocale?: string;
  searchFunction?: () => void;
  createAlgoliaClient?: (
    algoliasearch: Function,
    appId: string,
    apiKey: string
  ) => object;
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
}

@Injectable()
export class NgAisInstance {
  private instance?: InstantSearchInstance;
  private didSSR: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  public init(config: InstantSearchConfig) {
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
    if (!config.createAlgoliaClient) {
      config.createAlgoliaClient = (algoliasearch, appId, apiKey) => {
        const client = algoliasearch(appId, apiKey);
        client.addAlgoliaAgent(`angular-instantsearch ${process.env.VERSION}`);
        return client;
      };
    }

    this.instance = instantsearch(config);
  }

  public start() {
    this.instance.start();
  }

  public addWidget(widget: Widget) {
    this.instance.addWidget(widget);
  }

  public addWidgets(widgets: Widget[]) {
    this.instance.addWidgets(widgets);
  }

  public removeWidget(widget: Widget) {
    this.instance.removeWidget(widget);
  }

  public removeWidgets(widgets: Widget[]) {
    this.instance.removeWidgets(widgets);
  }

  public on(eventName: string, callback: Function) {
    this.instance.on(eventName, callback);
  }

  public off(eventName: string, callback: Function) {
    this.instance.removeListener(eventName, callback);
  }

  getResults() {
    return this.instance.helper.lastResults;
  }

  getState() {
    return this.instance.helper.state;
  }
}
