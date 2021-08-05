import { Input, OnDestroy, OnInit, forwardRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { bem, noop } from './utils';
import { NgAisInstantSearch } from './instantsearch/instantsearch';
import { NgAisIndex } from './index-widget/index-widget';
import {
  Widget,
  WidgetDescription,
  Connector,
} from 'instantsearch.js/es/types';

export { Widget, Connector };

export type ExtractConnectorParams<
  T extends Connector<unknown & WidgetDescription, unknown>
> = T extends Connector<infer TWidgetDescription, infer TConnectorParams>
  ? TConnectorParams
  : never;

export type ExtractRenderer<
  T extends Connector<unknown & WidgetDescription, unknown>
> = Parameters<T>[0];

export type ExtractUnmounter<
  T extends Connector<unknown & WidgetDescription, unknown>
> = Parameters<T>[1];

export type ExtractRenderState<
  T extends Connector<unknown & WidgetDescription, unknown>
> = Parameters<ExtractRenderer<T>>[0];

export abstract class BaseWidget<
  TConnector extends Connector<unknown & WidgetDescription, unknown>
> implements OnInit, OnDestroy {
  @Input() public autoHideContainer?: boolean;

  public widget?: Widget;
  public state?: ExtractRenderState<TConnector>;
  public cx: ReturnType<typeof bem>;
  public abstract instantSearchInstance: NgAisInstantSearch;
  public abstract parentIndex?: NgAisIndex;

  protected constructor(widgetName: string) {
    this.cx = bem(widgetName);
  }

  get parent() {
    if (this.parentIndex) {
      return this.parentIndex;
    }
    return this.instantSearchInstance;
  }

  public createWidget(
    connector: TConnector,
    options: ExtractConnectorParams<TConnector>
  ) {
    this.widget = connector(this.updateState, noop as ExtractUnmounter<
      TConnector
    >)(options);
  }

  public ngOnInit() {
    this.parent.addWidgets([this.widget]);
  }

  public ngOnDestroy() {
    if (isPlatformBrowser(this.instantSearchInstance.platformId)) {
      this.parent.removeWidgets([this.widget]);
    }
  }

  public updateState: ExtractRenderer<TConnector> = (
    state,
    isFirstRendering
  ) => {
    if (isFirstRendering) {
      Promise.resolve().then(() => {
        this.state = state;
      });
    } else {
      this.state = state;
    }
  };

  /**
   * Helper to generate class names for an item
   * @param item element to generate a class name for
   */
  public getItemClass(item: { isRefined?: boolean }): string {
    const className = this.cx('item');

    if (item.isRefined) {
      return `${className} ${this.cx('item', 'selected')}`;
    }

    return className;
  }
}
