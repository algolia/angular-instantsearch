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

@Component({
  selector: "ng-ais-instantsearch",
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
    if (!config.createAlgoliaClient) {
      config.createAlgoliaClient = (algoliasearch, appId, apiKey) => {
        const client = algoliasearch(appId, apiKey);
        client.addAlgoliaAgent(`angular-instantsearch ${VERSION}`);
        return client;
      };
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
