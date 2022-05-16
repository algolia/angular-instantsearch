import {
  Component,
  Input,
  Inject,
  forwardRef,
  Optional,
  SkipSelf,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Widget } from 'instantsearch.js/es/types';
import { NgAisInstantSearch } from '../instantsearch/instantsearch';
import indexWidget, {
  IndexWidget,
  IndexWidgetParams,
} from 'instantsearch.js/es/widgets/index/index';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'ais-index',
  template: `<ng-content></ng-content>`,
})
export class NgAisIndex implements OnInit, OnDestroy {
  @Input() public indexName: IndexWidgetParams['indexName'];
  @Input() public indexId?: IndexWidgetParams['indexId'];

  public widget?: IndexWidget;

  constructor(
    // public API does not include SkipSelf, but the index widget should accept parents, avoiding itself.
    @SkipSelf()
    @Inject(forwardRef(() => NgAisIndex))
    @Optional()
    public parentIndex: NgAisIndex,
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchInstance: NgAisInstantSearch
  ) {}

  get parent() {
    if (this.parentIndex) {
      return this.parentIndex;
    }
    return this.instantSearchInstance;
  }

  createWidget() {
    this.widget = {
      ...indexWidget({
        indexName: this.indexName,
        indexId: this.indexId,
      }),
      $$widgetType: 'ais.index',
    };
  }

  public addWidgets(widgets: Widget[]) {
    this.widget.addWidgets(widgets);
  }

  public removeWidgets(widgets: Widget[]) {
    this.widget.removeWidgets(widgets);
  }

  ngOnInit() {
    this.createWidget();
    this.parent.addWidgets([this.widget]);
  }
  public ngOnDestroy() {
    if (isPlatformBrowser(this.instantSearchInstance.platformId)) {
      this.parent.removeWidgets([this.widget]);
    }
  }
}
