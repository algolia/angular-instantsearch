import {
  Component,
  Inject,
  forwardRef,
  Input,
  ContentChild,
  ElementRef,
  TemplateRef,
} from '@angular/core';
import { BaseWidget, NgAisInstantSearch } from 'angular-instantsearch';
import { connectRatingMenu } from 'instantsearch.js/es/connectors';

const noop = (): void => {};
const parseNumberInput = (input?: number | string): number => {
  return typeof input === 'string' ? parseInt(input, 10) : input;
};

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
  selector: 'app-rating-menu',
  template: `
    <div
      [class]="cx()"
      *ngIf="!isHidden"
    >
      <ul [class]="cx('list')">
        <li
          *ngFor="let item of state.items"
          [class]="getRatingItemClass(item, state.items)"
          (click)="handleClick($event, item.value)"
        >
          <a
            href="{{state.createURL(item.value)}}"
            [class]="cx('link')"
            (click)="handleClick($event, item.value)"
          >
            <ng-container *ngFor="let star of item.stars">
              <ng-container
                *ngTemplateOutlet="(starSvg || defaultStarSvg); context: { star: star }"
              >
              </ng-container>
            </ng-container>

            <span [class]="cx('count')">{{item.count}}</span>
          </a>
        </li>
      </ul>
    </div>

    <ng-template #defaultStarSvg let-star="star">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path *ngIf="star" d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z"/>
        <path *ngIf="!star" d="M12 6.76l1.379 4.246h4.465l-3.612 2.625 1.379 4.246-3.611-2.625-3.612 2.625 1.379-4.246-3.612-2.625h4.465l1.38-4.246zm0-6.472l-2.833 8.718h-9.167l7.416 5.389-2.833 8.718 7.417-5.388 7.416 5.388-2.833-8.718 7.417-5.389h-9.167l-2.833-8.718z"/>
      </svg>
    </ng-template>
  `,
})
export class RatingMenu extends BaseWidget {
  // rendering options
  @ContentChild('starSvg') starSvg: TemplateRef<ElementRef>;

  // instance options
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
      max: parseNumberInput(this.max),
    });
    super.ngOnInit();
  }

  public handleClick(event: MouseEvent, value: string) {
    event.preventDefault();
    event.stopPropagation();

    this.state.refine(value);
  }

  public getRatingItemClass(item: { isRefined?: boolean }, items) {
    let className = this.cx('item');

    if (item.isRefined || items.every(item => !item.isRefined)) {
      className = `${className} ${this.cx('item', 'selected')}`;
    }

    return className;
  }
}
