import {
  Inject,
  Input,
  Component,
  ContentChild,
  TemplateRef,
  forwardRef
} from "@angular/core";

import { connectHits } from "instantsearch.js/es/connectors";
import { isFunction } from "lodash-es";

import { BaseWidget } from "../base-widget";
import { NgAisInstantSearch } from "../instantsearch/instantsearch";

@Component({
  selector: "ng-ais-hits",
  template: `
    <div [class]="cx()">
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
  `
})
export class NgAisHits extends BaseWidget {
  @ContentChild(TemplateRef) public template?: TemplateRef<any>;

  // render options
  @Input() transformItems?: Function;

  // inner widget state returned from connector
  public state: { hits: {}[]; results: {} } = { hits: [], results: {} };

  constructor(
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchParent: any
  ) {
    super("Results");
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
