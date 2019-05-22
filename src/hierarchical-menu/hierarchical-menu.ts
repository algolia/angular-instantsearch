import { Component, Input, Inject, forwardRef } from '@angular/core';

import { connectHierarchicalMenu } from 'instantsearch.js/es/connectors';
import { BaseWidget } from '../base-widget';
import { NgAisInstantSearch } from '../instantsearch/instantsearch';
import { parseNumberInput, noop } from '../utils';

export type HierarchicalMenuState = {
  createURL: Function;
  items: {}[];
  refine: Function;
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
          *ngFor="let item of state.items"
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
  // render option
  @Input() public transformItems?: Function;

  // instance options
  @Input() public attributes: string[];
  @Input() public separator?: string;
  @Input() public rootPath?: string;
  @Input() public showParentLevel?: boolean;
  @Input() public limit?: number | string;
  @Input() public sortBy?: string[] | ((item: object) => number);

  public state: HierarchicalMenuState = {
    createURL: noop,
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
      transformItems: this.transformItems,
    });

    super.ngOnInit();
  }
}
