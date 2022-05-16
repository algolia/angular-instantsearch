import { Component, Input, Inject, forwardRef, Optional } from '@angular/core';

import { connectHierarchicalMenu } from 'instantsearch.js/es/connectors';
import {
  HierarchicalMenuConnectorParams,
  HierarchicalMenuWidgetDescription,
  HierarchicalMenuRenderState,
} from 'instantsearch.js/es/connectors/hierarchical-menu/connectHierarchicalMenu';
import { TypedBaseWidget } from '../typed-base-widget';
import { NgAisInstantSearch } from '../instantsearch/instantsearch';
import { NgAisIndex } from '../index-widget/index-widget';
import { parseNumberInput, noop } from '../utils';

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
export class NgAisHierarchicalMenu extends TypedBaseWidget<
  HierarchicalMenuWidgetDescription,
  HierarchicalMenuConnectorParams
> {
  @Input() public attributes: HierarchicalMenuConnectorParams['attributes'];
  @Input() public separator?: HierarchicalMenuConnectorParams['separator'];
  @Input() public rootPath?: HierarchicalMenuConnectorParams['rootPath'];
  @Input()
  public showParentLevel?: HierarchicalMenuConnectorParams['showParentLevel'];
  @Input() public limit?: HierarchicalMenuConnectorParams['limit'];
  @Input() public sortBy?: HierarchicalMenuConnectorParams['sortBy'];

  @Input()
  public transformItems?: HierarchicalMenuConnectorParams['transformItems'];

  public state: HierarchicalMenuRenderState = {
    createURL: () => '#',
    items: [],
    refine: noop,
    canRefine: false,
    isShowingMore: false,
    toggleShowMore: noop,
    canToggleShowMore: false,
    sendEvent: noop,
  };

  get isHidden(): boolean {
    return this.state.items.length === 0 && this.autoHideContainer;
  }

  constructor(
    @Inject(forwardRef(() => NgAisIndex))
    @Optional()
    public parentIndex: NgAisIndex,
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchInstance: NgAisInstantSearch
  ) {
    super('HierarchicalMenu');
  }

  public ngOnInit() {
    this.createWidget(
      connectHierarchicalMenu,
      {
        limit: parseNumberInput(this.limit),
        attributes: this.attributes,
        rootPath: this.rootPath,
        separator: this.separator,
        showParentLevel: this.showParentLevel,
        sortBy: this.sortBy,
        transformItems: this.transformItems,
      },
      {
        $$widgetType: 'ais.hierarchicalMenu',
      }
    );

    super.ngOnInit();
  }
}
