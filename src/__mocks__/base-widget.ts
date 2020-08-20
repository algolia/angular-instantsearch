import { Input, OnDestroy, OnInit } from '@angular/core';
import { bem } from '../utils';
import { Widget } from 'instantsearch.js';

export type Connector = (
  renderFn: (state: object, isFirstRendering: boolean) => void,
  unmountFn: () => void
) => (widgetOptions?: object) => Widget;

export class BaseWidget implements OnInit, OnDestroy {
  public widget?: Widget;
  public state?: object;
  public cx?: Function;

  constructor(widgetName: string) {
    this.cx = bem(widgetName);
  }

  public createWidget(connector: Connector, options: object = {}) {
    // nothing to do, test env
  }

  public ngOnInit() {
    // nothing to do, test env
  }

  public ngOnDestroy() {
    // nothing to do, test env
  }

  public updateState = (state, isFirstRendering): Promise<void> | void => {
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
