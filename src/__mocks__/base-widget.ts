import { Input, OnDestroy, OnInit } from '@angular/core';
import { bem } from '../utils';

export class BaseWidget implements OnInit, OnDestroy {
  // header footer
  @Input() public header?: string;
  @Input() public footer?: string;

  public widget?: Widget;
  public state?: object;
  public cx?: Function;

  constructor(widgetName: string) {
    this.cx = bem(widgetName);
  }

  public createWidget(connector: Connector, options: object = {}) {
    // nothind to do, test env
  }

  public ngOnInit() {
    // nothind to do, test env
  }

  public ngOnDestroy() {
    // nothind to do, test env
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
