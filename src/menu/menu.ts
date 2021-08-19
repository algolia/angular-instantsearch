import { Component, Input, Inject, forwardRef, Optional } from '@angular/core';

import { connectMenu } from 'instantsearch.js/es/connectors';
import { TypedBaseWidget } from '../typed-base-widget';
import { NgAisInstantSearch } from '../instantsearch/instantsearch';
import { NgAisIndex } from '../index-widget/index-widget';
import { noop } from '../utils';
import {
  MenuConnectorParams,
  MenuWidgetDescription,
  MenuRenderState,
  MenuItem,
} from 'instantsearch.js/es/connectors/menu/connectMenu';

@Component({
  selector: 'ais-menu',
  template: `
    <div
      [class]="cx()"
      *ngIf="!isHidden"
    >
      <ul [class]="cx('list')">
        <li
          [class]="getItemClass(item)"
          *ngFor="let item of state.items"
          (click)="handleClick($event, item.value)"
        >
          <a
            href="{{state.createURL(item.value)}}"
            [class]="cx('link')"
            (click)="handleClick($event, item.value)"
          >
            <span [class]="cx('label')">{{item.label}}</span>
            <span [class]="cx('count')">{{item.count}}</span>
          </a>
        </li>
      </ul>

      <button
        *ngIf="showMore"
        (click)="state.toggleShowMore()"
        [class]="showMoreClass"
        [disabled]="!state.canToggleShowMore"
      >
        {{state.isShowingMore ? showLessLabel : showMoreLabel}}
      </button>
    </div>
  `,
})
export class NgAisMenu extends TypedBaseWidget<
  MenuWidgetDescription,
  MenuConnectorParams
> {
  // rendering options
  @Input() public showMoreLabel: string = 'Show more';
  @Input() public showLessLabel: string = 'Show less';

  // instance options
  @Input() public attribute: MenuConnectorParams['attribute'];
  @Input() public showMore?: MenuConnectorParams['showMore'];
  @Input() public limit?: MenuConnectorParams['limit'];
  @Input() public showMoreLimit?: MenuConnectorParams['showMoreLimit'];
  @Input() public sortBy?: MenuConnectorParams['sortBy'];
  @Input() public transformItems?: MenuConnectorParams['transformItems'];

  public state: MenuRenderState = {
    items: [],
    refine: noop,
    createURL: () => '#',
    canRefine: false,
    isShowingMore: false,
    canToggleShowMore: false,
    toggleShowMore: noop,
    sendEvent: noop,
  };

  get isHidden() {
    return this.state.items.length === 0 && this.autoHideContainer;
  }

  get showMoreClass() {
    let className = this.cx('showMore');

    if (!this.state.canToggleShowMore) {
      className = `${className} ${this.cx('showMore', 'disabled')}`;
    }

    return className;
  }

  constructor(
    @Inject(forwardRef(() => NgAisIndex))
    @Optional()
    public parentIndex: NgAisIndex,
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchInstance: NgAisInstantSearch
  ) {
    super('Menu');
  }

  public ngOnInit() {
    this.createWidget(connectMenu, {
      attribute: this.attribute,
      showMore: this.showMore,
      limit: this.limit,
      showMoreLimit: this.showMoreLimit,
      sortBy: this.sortBy,
      transformItems: this.transformItems,
    });

    super.ngOnInit();
  }

  handleClick(event: MouseEvent, value: MenuItem['value']) {
    event.preventDefault();
    event.stopPropagation();

    this.state.refine(value);
  }
}
