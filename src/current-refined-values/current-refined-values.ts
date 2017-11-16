import { Component, Input } from "@angular/core";
import { connectCurrentRefinedValues } from "instantsearch.js/es/connectors";
import { noop, isFunction } from "lodash-es";

import { BaseWidget } from "../base-widget";
import { NgAisInstance } from "../instantsearch/instantsearch-instance";

export type CurrentRefinedValuesState = {
  attributes: {};
  clearAllClick: Function;
  clearAllURL: Function;
  createURL: Function;
  refine: Function;
  refinements: {}[];
};

@Component({
  selector: "ng-ais-current-refined-values",
  template: `
    <div [class]="cx()">
      <ng-ais-header [header]="header" [className]="cx('header')"></ng-ais-header>

      <div [class]="cx('body')">
        <button
          [class]="cx('reset')"
          (click)="handleClearAllClick($event)"
          *ngIf="clearAll === 'before' || clearAll === true">
          {{clearAllLabel}}
        </button>

        <ul [class]="cx('list')">
          <li
            [class]="cx('item')"
            *ngFor="let refinement of refinements"
            (click)="handleClick($event, refinement)"
          >
            <button [class]="cx('button')">
              {{refinement.computedLabel}}
              <span [class]="cx('count')">{{refinement.count}}</span>
            </button>
          </li>
        </ul>

        <button
          [class]="cx('reset')"
          (click)="handleClearAllClick($event)"
          *ngIf="clearAll === 'after'">
          {{clearAllLabel}}
        </button>
      </div>

      <ng-ais-footer [footer]="footer" [className]="cx('footer')"></ng-ais-footer>
    </div>
  `
})
export class NgAisCurrentRefinedValues extends BaseWidget {
  // render options
  @Input() public clearAll: "before" | "after" | boolean = "before";
  @Input() public clearAllLabel: string = "Clear all";
  @Input() public transformItems?: Function;

  // connector options
  @Input() public onlyListedAttributes: boolean = false;
  @Input() public clearsQuery: boolean = false;
  @Input()
  public attributes: {
    name: string;
    label: string;
  }[] = [];

  public state: CurrentRefinedValuesState = {
    attributes: {},
    clearAllClick: noop,
    clearAllURL: noop,
    createURL: noop,
    refine: noop,
    refinements: []
  };

  get refinements() {
    return isFunction(this.transformItems)
      ? this.transformItems(this.state.refinements)
      : this.state.refinements;
  }

  constructor(searchInstance: NgAisInstance) {
    super(searchInstance, "CurrentRefinedValues");
  }

  public ngOnInit() {
    this.createWidget(connectCurrentRefinedValues, {
      attributes: this.attributes,
      clearsQuery: this.clearsQuery,
      onlyListedAttributes: this.onlyListedAttributes
    });
    super.ngOnInit();
  }

  public handleClick(event: MouseEvent, refinement: {}) {
    event.preventDefault();
    this.state.refine(refinement);
  }

  public handleClearAllClick(event: MouseEvent) {
    event.preventDefault();
    this.state.clearAllClick();
  }
}
