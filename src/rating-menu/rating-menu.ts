import { Component, Input, Inject, forwardRef } from '@angular/core';

import { connectRatingMenu } from 'instantsearch.js/es/connectors';
import { BaseWidget } from '../base-widget';
import { NgAisInstantSearch } from '../instantsearch/instantsearch';
import { noop } from '../utils';

export type RatingMenuItem = {
  count: number;
  isRefined: boolean;
  name: string;
  value: string;
  stars: boolean[];
};

export type RatingMenuState = {
  createURL: Function;
  hasNoResults: boolean;
  items: RatingMenuItem[];
  refine: Function;
};

@Component({
  selector: 'ais-rating-menu',
  template: `
    <div
      [class]="cx()"
      *ngIf="!isHidden"
    >
      <svg style="display:none;">
        <symbol
          id="ais-StarRating-starSymbol"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z"/>
        </symbol>
        <symbol
          id="ais-StarRating-starEmptySymbol"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path d="M12 6.76l1.379 4.246h4.465l-3.612 2.625 1.379 4.246-3.611-2.625-3.612 2.625 1.379-4.246-3.612-2.625h4.465l1.38-4.246zm0-6.472l-2.833 8.718h-9.167l7.416 5.389-2.833 8.718 7.417-5.388 7.416 5.388-2.833-8.718 7.417-5.389h-9.167l-2.833-8.718z"/>
        </symbol>
      </svg>

      <ul [class]="cx('list')">
        <li
          *ngFor="let item of state.items"
          [class]="getItemClass(item)"
          (click)="handleClick($event, item.value)"
        >
          <a
            href="{{state.createURL(item.value)}}"
            [class]="cx('link')"
            (click)="handleClick($event, item.value)"
          >
            <svg
              *ngFor="let star of item.stars"
              [ngClass]="cx('starIcon')"
              aria-hidden="true"
            >
              <use
                *ngIf="star"
                xlink:href="#ais-StarRating-starSymbol"
              >
              </use>

              <use
                *ngIf="!star"
                xlink:href="#ais-StarRating-starEmptySymbol"
              >
              </use>
            </svg>

            <span [class]="cx('label')" aria-hidden="true">{{andUpLabel}}</span>
            <span [class]="cx('count')">{{item.count}}</span>
          </a>
        </li>
      </ul>
    </div>
  `,
})
export class NgAisRatingMenu extends BaseWidget {
  // render options
  @Input() public andUpLabel: string = '& Up';

  // connectors options
  @Input() public attribute: string;
  @Input() public max?: number;

  public state: RatingMenuState = {
    createURL: noop,
    hasNoResults: false,
    items: [],
    refine: noop,
  };

  get isHidden() {
    return this.state.items.length === 0 && this.autoHideContainer;
  }

  constructor(
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchParent: any
  ) {
    super('RatingMenu');
  }

  public ngOnInit() {
    this.createWidget(connectRatingMenu, {
      attribute: this.attribute,
      max: this.max,
    });
    super.ngOnInit();
  }

  public handleClick(event: MouseEvent, value: string) {
    event.preventDefault();
    event.stopPropagation();

    this.state.refine(value);
  }
}
