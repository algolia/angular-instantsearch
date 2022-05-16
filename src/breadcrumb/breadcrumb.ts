import { Component, Input, Inject, forwardRef, Optional } from '@angular/core';
import { connectBreadcrumb } from 'instantsearch.js/es/connectors';
import {
  BreadcrumbConnectorParams,
  BreadcrumbWidgetDescription,
  BreadcrumbRenderState,
  BreadcrumbConnectorParamsItem,
} from 'instantsearch.js/es/connectors/breadcrumb/connectBreadcrumb';
import { TypedBaseWidget } from '../typed-base-widget';
import { NgAisInstantSearch } from '../instantsearch/instantsearch';
import { NgAisIndex } from '../index-widget/index-widget';
import { noop } from '../utils';

@Component({
  selector: 'ais-breadcrumb',
  template: `
    <div
      [class]="cx()"
      *ngIf="!isHidden"
    >
      <ul [class]="cx('list')">
        <li
          *ngFor="let item of items"
          [ngClass]="[cx('item'), item.isLast ? cx('item', 'selected') : '']"
          (click)="handleClick($event, item)"
        >
          <span
            *ngIf="item.separator"
            [class]="cx('separator')"
            aria-hidden="true"
          >
            >
          </span>
          <a
            [class]="cx('link')"
            href="{{state.createURL(item.value)}}"
            *ngIf="!item.isLast"
            (click)="handleClick($event, item)"
          >
            {{item.label}}
          </a>

          <span *ngIf="item.isLast">
            {{item.label}}
          </span>
        </li>
      </ul>
    </div>
  `,
})
export class NgAisBreadcrumb extends TypedBaseWidget<
  BreadcrumbWidgetDescription,
  BreadcrumbConnectorParams
> {
  // instance options
  @Input() public attributes: BreadcrumbConnectorParams['attributes'];
  @Input() public rootPath?: BreadcrumbConnectorParams['rootPath'];
  @Input() public separator?: BreadcrumbConnectorParams['separator'];
  @Input() public transformItems?: BreadcrumbConnectorParams['transformItems'];

  get isHidden() {
    return this.state.items.length === 0 && this.autoHideContainer;
  }

  get items() {
    return this.state.items.map((item, idx) => ({
      ...item,
      separator: idx !== 0,
      isLast: idx === this.state.items.length - 1,
      // FIXME: get rid of this. We can use `last` local variable
      // https://angular.io/api/common/NgForOf#local-variables
    }));
  }

  public state: BreadcrumbRenderState = {
    createURL: () => '#',
    items: [],
    refine: noop,
    canRefine: false,
  };

  constructor(
    @Inject(forwardRef(() => NgAisIndex))
    @Optional()
    public parentIndex: NgAisIndex,
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchInstance: NgAisInstantSearch
  ) {
    super('Breadcrumb');
  }

  public ngOnInit() {
    this.createWidget(
      connectBreadcrumb,
      {
        attributes: this.attributes,
        rootPath: this.rootPath,
        separator: this.separator,
        transformItems: this.transformItems,
      },
      {
        $$widgetType: 'ais.breadcrumb',
      }
    );

    super.ngOnInit();
  }

  public handleClick(
    event: MouseEvent,
    item: BreadcrumbConnectorParamsItem
  ): void {
    event.preventDefault();
    event.stopPropagation();

    if (item.value) {
      this.state.refine(item.value);
    }
  }
}
