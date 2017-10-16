import { Injectable } from "@angular/core";
import instantsearch from "instantsearch.js/es";

@Injectable()
export class NgISInstance {
  public appId: string;
  public apiKey: string;
  public indexName: string;

  public numberLocale?: string;
  public searchFunction?: () => void;
  public createAlgoliaClient?: () => object;
  public searchParameters?: object | void;
  public urlSync?:
    | boolean
    | {
        mapping?: object;
        threshold?: number;
        trackedParameters?: string[];
        useHash?: boolean;
        getHistoryState?: () => object;
      };

  private instance?: {
    start: () => void;
  };

  public init(config: object) {
    this.instance = instantsearch(config);
  }

  public start() {
    this.instance.start();
  }
}
