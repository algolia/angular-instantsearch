import { Injectable, Inject, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";

import instantsearch from "instantsearch.js/es";

import { Widget } from "../base-widget";
import { VERSION } from "../version";

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

  public dispose: () => void;
}

@Injectable()
export class NgAisInstance {
  private instances: { instance: InstantSearchInstance; name: string }[] = [];
  private didSSR: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  public getInstantSearchInstance(
    name: string = "default"
  ): InstantSearchInstance {
    return this.instances.find(instance => instance.name === name).instance;
  }

  public init(
    config: InstantSearchConfig,
    instanceName: string = "default"
  ): InstantSearchInstance {
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
        client.addAlgoliaAgent(`angular-instantsearch ${VERSION}`);
        return client;
      };
    }

    const instance = instantsearch(config);

    this.instances.push({
      name: instanceName,
      instance: instantsearch(config)
    });

    return instance;
  }

  // remove all remaining widgets and remove instance from
  // `this.instances` array
  public dispose(instanceName: string) {
    const currentInstance = this.getInstantSearchInstance(instanceName);
    currentInstance.dispose();

    const idx = this.instances.findIndex(
      instance => instance.name === instanceName
    );

    this.instances.splice(idx, 1);
  }
}
