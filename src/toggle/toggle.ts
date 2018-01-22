import { Component, Input, Inject, PLATFORM_ID } from "@angular/core";
import { connectToggle } from "instantsearch.js/es/connectors";
import { noop } from "lodash-es";

import { BaseWidget } from "../base-widget";
import { NgAisInstance } from "../instantsearch/instantsearch-instance";

export type ToggleState = {
  createURL: Function;
  refine: Function;
  value: {
    name?: string;
    count?: number;
    isRefined?: boolean;
  };
};

@Component({
  selector: "ng-ais-toggle",
  template: `
    <div [class]="cx()">
      <div [class]="cx('body')">
        <ul [class]="cx('list')">
          <li
            [class]="cx('item')"
            (click)="handleClick($event)">
            <label [class]="cx('label')">
              <input
                [class]="cx('checkbox')"
                type="checkbox"
                value="{{state.value.name}}"
                [checked]="state.value.isRefined"
              />
              {{label || state.value.name}}
              <span [class]="cx('count')">
                {{state.value.count}}
              </span>
            </label>
          </li>
        </ul>
      </div>
    </div>
  `
})
export class NgAisToggle extends BaseWidget {
  // connector options
  @Input() public attributeName: string;
  @Input() public label: string;
  @Input()
  public values: { on?: boolean; off?: boolean } = { on: true, off: undefined };

  public state: ToggleState = {
    createURL: noop,
    refine: noop,
    value: {}
  };

  constructor(
    @Inject(PLATFORM_ID) public platformId: Object,
    searchInstance: NgAisInstance
  ) {
    super(searchInstance, "Toggle");
  }

  public ngOnInit() {
    this.createWidget(connectToggle, {
      attributeName: this.attributeName,
      label: this.label,
      values: this.values
    });
    super.ngOnInit();
  }

  public handleClick(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.state.refine(this.state.value);
  }
}
