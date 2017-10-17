/* tslint:disable:max-classes-per-file */
/* tslint:disable:interface-name */

interface InstantSearchConfig {
  appId: string;
  apiKey: string;
  indexName: string;

  numberLocale?: string;
  searchFunction?: () => void;
  createAlgoliaClient?: () => object;
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
}

declare class Widget {
  public init: () => void;
  public getConfiguration: () => object;
  public render: (
    params: {
      templatesConfig: object;
      state: object;
      results: Array<{}>;
      createURL: (value: any) => string;
      instantSearchInstance: object;
    }
  ) => void;
  public dispose: (
    params: {
      helper: object;
      state: object;
    }
  ) => object | void;
}

declare class InstantSearchInstance {
  public start: () => void;

  public addWidget: (widget: Widget) => void;
  public addWidgets: (widgets: Widget[]) => void;

  public removeWidget: (widget: Widget) => void;
  public removeWidgets: (widgets: Widget[]) => void;
}
