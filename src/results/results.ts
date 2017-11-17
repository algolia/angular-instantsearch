import { Input, Component, ContentChild, TemplateRef } from "@angular/core";
import { connectHits } from "instantsearch.js/es/connectors";
import { isFunction } from "lodash-es";

import { BaseWidget } from "../base-widget";
import { NgAisInstance } from "../instantsearch/instantsearch-instance";

@Component({
  selector: "ng-ais-results",
  template: `
    <div [class]="cx()">
      <ng-ais-header [header]="header" [className]="cx('header')"></ng-ais-header>

      <div [class]="cx('body')">
        <ng-container *ngTemplateOutlet="template; context: state"></ng-container>

        <!-- default rendering if no template specified -->
        <div *ngIf="!template">
          <ul [class]="cx('list')">
            <li
              [class]="cx('item')"
              *ngFor="let hit of state.hits"
            >
              <ng-ais-highlight attributeName="name" [hit]="hit">
              </ng-ais-highlight>
            </li>
          </ul>
        </div>
      </div>

      <ng-ais-footer [footer]="footer" [className]="cx('footer')"></ng-ais-footer>
    </div>
  `
})
export class NgAisResults extends BaseWidget {
  @ContentChild(TemplateRef) public template?: TemplateRef<any>;

  // render options
  @Input() transformItems?: Function;

  // inner widget state returned from connector
  public state: { hits: {}[]; results: {} } = { hits: [], results: {} };

  constructor(searchInstance: NgAisInstance) {
    super(searchInstance, "Results");
    this.createWidget(connectHits, { escapeHits: true });
  }

  updateState = (
    state: { hits: {}[]; results: {} },
    isFirstRendering: boolean
  ) => {
    if (isFirstRendering) return;

    this.state = {
      ...state,
      results: state.results,
      hits: isFunction(this.transformItems)
        ? this.transformItems(state.hits)
        : state.hits
    };
  };
}
