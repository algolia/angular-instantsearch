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
        [ngClass]="{
          'ais-RatingMenu-starIcon': true,
          'ais-RatingMenu-starIcon--full': star,
          'ais-RatingMenu-starIcon--empty': !star
        }"
        aria-hidden="true"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M10.472 5.008L16 5.816l-4 3.896.944 5.504L8 12.616l-4.944 2.6L4 9.712 0 5.816l5.528-.808L8 0z"
        ></path>
      </svg>
    </ng-template>
  `,
})
export class RatingMenu extends BaseWidget {
  // rendering options
  @ContentChild('starSvg', { static: true })
  starSvg: TemplateRef<ElementRef>;

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

  public getRatingItemClass(
    item: { isRefined: boolean },
    items: RatingMenuItem[]
  ) {
    let className = this.cx('item');

    if (item.isRefined || items.every(item => !item.isRefined)) {
      className = `${className} ${this.cx('item', 'selected')}`;
    }

    return className;
  }
}
