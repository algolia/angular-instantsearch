import { Component, Input } from '@angular/core';
import { bem } from '../utils';

export type HierarchicalMenuItem = {
  value: string;
  label: string;
  count: number;
  isRefined: boolean;
  data: HierarchicalMenuItem[];
};

@Component({
  selector: 'ais-hierarchical-menu-item',
  template: `
    <li
      [class]="getItemClass(item)"
      (click)="handleClick($event, item)"
    >
      <a
        [class]="cx('link')"
        href="{{createURL(item.value)}}"
        (click)="handleClick($event, item)"
      >
        <span [class]="cx('label')">{{item.label}}</span>
        <span [class]="cx('count')">{{item.count}}</span>
      </a>

      <ul
        [class]="getListClass()"
        *ngIf="item.isRefined && isArray(item.data) && item.data.length > 0"
      >
        <ais-hierarchical-menu-item
          *ngFor="let child of item.data"
          [item]="child"
          [createURL]="createURL"
          [refine]="refine"
          [lvl]="lvl + 1"
        >
        </ais-hierarchical-menu-item>
      </ul>
    </li>
  `,
})
export class NgAisHierarchicalMenuItem {
  @Input() public lvl: number = 1;
  @Input() public refine: (string) => void;
  @Input() public createURL: (string) => string;
  @Input() public item: HierarchicalMenuItem;

  public cx = bem('HierarchicalMenu');

  public getItemClass(item) {
    let className = this.cx('item');

    if (item.isRefined) {
      className = `${className} ${this.cx('item', 'selected')}`;
    }

    if (this.isArray(item.data) && item.data.length > 0) {
      className = `${className} ${this.cx('item', 'parent')}`;
    }

    return className;
  }

  public getListClass() {
    return `${this.cx('list')} ${this.cx('list', 'child')} ${this.cx(
      'list',
      `lvl${this.lvl}`
    )}`;
  }

  public isArray(potentialArray: any) {
    return Array.isArray(potentialArray);
  }

  public handleClick(event: MouseEvent, item: HierarchicalMenuItem) {
    event.preventDefault();
    event.stopPropagation();

    this.refine(item.value);
  }
}
