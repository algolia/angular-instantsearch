import { OnDestroy, OnInit } from '@angular/core';
import { bem } from '../utils';
import {
  Widget,
  Connector,
  Renderer,
  WidgetDescription,
} from 'instantsearch.js/es/types';

export class TypedBaseWidget<
  TWidgetDescription extends WidgetDescription,
  TConnectorParams
> implements OnInit, OnDestroy {
  public widget?: Widget;
  public state?: object;
  public cx?: Function;

  constructor(widgetName: string) {
    this.cx = bem(widgetName);
  }

  public createWidget(
    connector: Connector<TWidgetDescription, TConnectorParams>,
    options: TConnectorParams
  ) {
    // nothing to do, test env
  }

  public ngOnInit() {
    // nothing to do, test env
  }

  public ngOnDestroy() {
    // nothing to do, test env
  }

  public updateState: Renderer<
    TWidgetDescription['renderState'],
    TConnectorParams
  > = (state, isFirstRendering) => {
    this.state = state;
  };

  public getItemClass(item: { isRefined?: boolean }) {
    let className = this.cx('item');

    if (item.isRefined) {
      className = `${className} ${this.cx('item', 'selected')}`;
    }

    return className;
  }
}
