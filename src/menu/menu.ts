import { Component, Input, Inject, forwardRef } from '@angular/core';

import { connectMenu } from 'instantsearch.js/es/connectors';
import { BaseWidget } from '../base-widget';
import {
  NgAisInstantSearch,
  FacetSortByStringOptions,
} from '../instantsearch/instantsearch';
import { noop } from '../utils';

export type MenuItem = {
  value: string;
  label: string;
  count: number;
  isRefined: boolean;
};

export type MenuState = {
  items: MenuItem[];
  refine: Function;
  createURL: Function;
  isShowingMore: boolean;
  canToggleShowMore: boolean;
  toggleShowMore: Function;
};

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
export class NgAisMenu extends BaseWidget {
  // rendering options
  @Input() public showMoreLabel: string = 'Show more';
  @Input() public showLessLabel: string = 'Show less';

  // instance options
  @Input() public attribute: string;
  @Input() public showMore?: boolean;
  @Input() public limit?: number;
  @Input() public showMoreLimit?: number;
  @Input()
  public sortBy?:
    | FacetSortByStringOptions[]
    | ((a: MenuItem, b: MenuItem) => number);
  @Input()
  public transformItems?: <U extends MenuItem>(items: MenuItem[]) => U[];

  public state: MenuState = {
    items: [],
    refine: noop,
    createURL: noop,
    isShowingMore: false,
    canToggleShowMore: false,
    toggleShowMore: noop,
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
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchParent: any
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

  handleClick(event: MouseEvent, value: string) {
    event.preventDefault();
    event.stopPropagation();

    this.state.refine(value);
  }
}
