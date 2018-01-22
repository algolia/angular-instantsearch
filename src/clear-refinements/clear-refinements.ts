import { Component, Input, Inject, PLATFORM_ID } from "@angular/core";
import { connectClearAll } from "instantsearch.js/es/connectors";
import { noop } from "lodash-es";

import { BaseWidget } from "../base-widget";
import { NgAisInstance } from "../instantsearch/instantsearch-instance";

@Component({
  selector: "ng-ais-clear-refinements",
  template: `
    <div [class]="cx()">
      <div
        [class]="cx('body')"
        *ngIf="!isHidden"
      >
        <button
          [class]="cx('button') + (!state.hasRefinements ? (' ' + cx('button', 'disabled')) : '')"
          (click)="handleClick($event)"
          [disabled]="!state.hasRefinements"
        >
          {{buttonLabel}}
        </button>
      </div>
    </div>
  `
})
export class NgAisClearRefinements extends BaseWidget {
  @Input() public buttonLabel: string = "Clear refinements";
  @Input() public clearsQuery: boolean = false;
  @Input() public excludeAttributes: string[] = [];

  public state = { hasRefinements: false, refine: noop };

  get isHidden() {
    return !this.state.hasRefinements && this.autoHideContainer;
  }

  constructor(
    @Inject(PLATFORM_ID) public platformId: Object,
    searchInstance: NgAisInstance
  ) {
    super(searchInstance, "ClearRefinements");
  }

  public ngOnInit() {
    // we need to `createWidget` from `ngOnInit` to have `@Input()` intialized
    this.createWidget(connectClearAll, {
      clearsQuery: this.clearsQuery,
      excludeAttributes: this.excludeAttributes
    });

    super.ngOnInit();
  }

  public handleClick(event: MouseEvent) {
    event.preventDefault();

    if (this.state.hasRefinements) {
      this.state.refine();
    }
  }
}
