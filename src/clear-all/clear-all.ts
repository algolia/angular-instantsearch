import { Component, Input } from "@angular/core";
import { connectClearAll } from "instantsearch.js/es/connectors";
import { noop } from "lodash";

import { BaseWidget } from "../base-widget";
import { NgAisInstance } from "../instantsearch/instantsearch-instance";
import { bem } from "../utils";

const cx = bem("ClearAll");

@Component({
  selector: "ng-ais-clear-all",
  template: `
    <div class="${cx()}">
      <ng-ais-header [header]="header" className="${cx(
        "header"
      )}"></ng-ais-header>

      <div class="${cx("body")}">
        <button
          class="${cx("button")}"
          (click)="handleClick($event)"
          disable="!state.hasRefinements"
        >
          {{buttonLabel}}
        </button>
      </div>

      <ng-ais-footer [footer]="footer" className="${cx(
        "footer"
      )}"></ng-ais-footer>
    </div>
  `
})
export class NgAisClearAll extends BaseWidget {
  @Input() public buttonLabel: string = "Clear all";
  @Input() public clearsQuery: boolean = false;
  @Input() public excludeAttributes: string[] = [];

  public state = { hasRefinements: false, refine: noop };

  constructor(searchInstance: NgAisInstance) {
    super(searchInstance);
  }

  public ngOnInit() {
    // we need to `createWidget` from `ngOnInit` to have `@Input()` intialized
    this.createWidget(connectClearAll, {
      clearsQuery: this.clearsQuery,
      excludeAttributes: this.excludeAttributes
    });

    super.ngOnInit();
  }

  public handleClick(event) {
    event.preventDefault();

    if (this.state.hasRefinements) {
      this.state.refine();
    }
  }
}
