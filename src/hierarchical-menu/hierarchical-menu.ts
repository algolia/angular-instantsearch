import { Component, Input, Inject, forwardRef } from '@angular/core';

import { connectHierarchicalMenu } from 'instantsearch.js/es/connectors';
import { BaseWidget } from '../base-widget';
import { NgAisInstantSearch } from '../instantsearch/instantsearch';
import { parseNumberInput, noop } from '../utils';

export type HierarchicalMenuSortByStringOptions =
  | 'count:asc'
  | 'count:desc'
  | 'name:asc'
  | 'name:desc'
  | 'isRefined';

export type HierarchicalMenuState = {
  createURL: (value: string) => string;
  items: HierarchicalMenuItem[];
  refine: (value: string) => void;
};

export type HierarchicalMenuItem = {
  value: string;
  label: string;
  count: number;
  isRefined: boolean;
  data: HierarchicalMenuItem[] | null;
};

@Component({
  selector: 'ais-hierarchical-menu',
  template: `
    <div
      [class]="cx()"
      *ngIf="!isHidden"
    >
      <ul [class]="cx('list') + ' ' + cx('list', 'lvl0')">
        <ais-hierarchical-menu-item
          *ngFor="let item of items"
          [item]="item"
          [createURL]="state.createURL"
          [refine]="state.refine"
        >
        </ais-hierarchical-menu-item>
      </ul>
    </div>
  `,
})
export class NgAisHierarchicalMenu extends BaseWidget {
  @Input() public attributes: string[];
  @Input() public separator?: string;
  @Input() public rootPath?: string;
  @Input() public showParentLevel?: boolean;
  @Input() public limit?: number | string;
  @Input()
  public sortBy?:
    | HierarchicalMenuSortByStringOptions[]
    | ((a: HierarchicalMenuItem, b: HierarchicalMenuItem) => number);

  @Input()
  public transformItems?: <U extends HierarchicalMenuItem>(
    items: HierarchicalMenuItem[]
  ) => U[];

  public state: HierarchicalMenuState = {
    createURL: () => '#',
    items: [],
    refine: noop,
  };

  get isHidden(): boolean {
    return this.state.items.length === 0 && this.autoHideContainer;
  }

  get items() {
    return typeof this.transformItems === 'function'
      ? this.transformItems(this.state.items)
      : this.state.items;
  }

  constructor(
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchParent: any
  ) {
    super('HierarchicalMenu');
  }

  public ngOnInit() {
    this.createWidget(connectHierarchicalMenu, {
      limit: parseNumberInput(this.limit),
      attributes: this.attributes,
      rootPath: this.rootPath,
      separator: this.separator,
      showParentLevel: this.showParentLevel,
      sortBy: this.sortBy,
    });

    super.ngOnInit();
  }
}
