import { Injectable } from "@angular/core";
import instantsearch from "instantsearch.js/es";

@Injectable()
export class NgISInstance {
  private instance?: InstantSearchInstance;

  public init(config: InstantSearchConfig) {
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
}
