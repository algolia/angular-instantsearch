import { Injectable, Inject, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import instantsearch from "instantsearch.js/es";
import * as algoliasearchProxy from "algoliasearch/index";
import * as encodeProxy from "querystring-es3/encode";

import { each } from "lodash-es";

import { Widget } from "../base-widget";

// AOT + Rollup workaround
// https://github.com/rollup/rollup/issues/1267#issuecomment-296395734

const algoliasearch = algoliasearchProxy.default || algoliasearchProxy;
const encode = encodeProxy.default || encodeProxy;

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

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient
  ) {}

  public init(config: InstantSearchConfig) {
    // add default searchParameters with highlighting config
    if (!config.searchParameters) config.searchParameters = {};
    Object.assign(config.searchParameters, {
      highlightPreTag: "__ais-highlight__",
      highlightPostTag: "__/ais-highlight__"
    });

    const createAlgoliaClient = (_, appId, apiKey) => {
      const client = algoliasearch(appId, apiKey, {});

      client._request = (rawUrl, opts) => {
        let headers = new HttpHeaders();

        headers = headers.set(
          "content-type",
          opts.method === "POST"
            ? "application/x-www-form-urlencoded"
            : "application/json"
        );

        headers = headers.set("accept", "application/json");

        const url =
          rawUrl + (rawUrl.includes("?") ? "&" : "?") + encode(opts.headers);

        return new Promise((resolve, reject) => {
          this.http
            .request(opts.method, url, {
              headers,
              body: opts.body,
              observe: "response"
            })
            .subscribe(
              resp =>
                resolve({
                  statusCode: resp.status,
                  body: resp.body,
                  headers: resp.headers
                }),
              resp =>
                reject({
                  statusCode: resp.status,
                  body: resp.body,
                  headers: resp.headers
                })
            );
        });
      };

      return client;
    };

    Object.assign(config, { createAlgoliaClient });

    // remove URLSync widget if on SSR
    if (!isPlatformBrowser(this.platformId)) {
      config.urlSync = false;
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
