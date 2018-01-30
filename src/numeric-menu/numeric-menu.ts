import { Component, Input, Inject, forwardRef } from "@angular/core";

import { connectNumericRefinementList } from "instantsearch.js/es/connectors";
import { noop } from "lodash-es";

import { BaseWidget } from "../base-widget";
import { NgAisInstantSearch } from "../instantsearch/instantsearch";

export type NumericRefinementListState = {
  createURL: Function;
  items: {}[];
  refine: Function;
};

@Component({
  selector: "ng-ais-numeric-menu",
  template: `
    <div
      [class]="cx()"
      *ngIf="!isHidden"
    >
      <ul [class]="cx('list')">
        <li
          [class]="getItemClass(item)"
          *ngFor="let item of state.items"
          (click)="refine($event, item)"
        >
          <label [class]="cx('label')">
            <input
              [class]="cx('radio')"
              type="radio"
              name="NumericMenu"
              [checked]="item.isRefined"
            />
            <span [class]="cx('labelText')">{{item.label}}</span>
          </label>
        </li>
      </ul>
    </div>
  `
})
export class NgAisNumericMenu extends BaseWidget {
  @Input() public attribute: string;
  @Input()
  public options: {
    name: string;
    start?: number;
    end?: number;
  }[];

  public state: NumericRefinementListState = {
    createURL: noop,
    items: [],
    refine: noop
  };

  get isHidden() {
    return this.state.items.length === 0 && this.autoHideContainer;
  }

  constructor(
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchParent: any
  ) {
    super("NumericMenu");
  }

  public ngOnInit() {
    this.createWidget(connectNumericRefinementList, {
      attributeName: this.attribute,
      options: this.options
    });
    super.ngOnInit();
  }

  public refine(event: MouseEvent, item: { value: string }) {
    event.preventDefault();
    event.stopPropagation();
    this.state.refine(item.value);
  }
}
