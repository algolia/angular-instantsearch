import { Component, Input } from '@angular/core';
import { bem } from '../utils';
import {
  HierarchicalMenuItem,
  HierarchicalMenuState,
} from './hierarchical-menu';

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
  @Input() public refine: HierarchicalMenuState['refine'];
  @Input() public createURL: HierarchicalMenuState['createURL'];
  @Input() public item: HierarchicalMenuItem;

  public cx = bem('HierarchicalMenu');

  public getItemClass(item): string {
    let className = this.cx('item');

    if (item.isRefined) {
      className = `${className} ${this.cx('item', 'selected')}`;
    }

    if (this.isArray(item.data) && item.data.length > 0) {
      className = `${className} ${this.cx('item', 'parent')}`;
    }

    return className;
  }

  public getListClass(): string {
    return `${this.cx('list')} ${this.cx('list', 'child')} ${this.cx(
      'list',
      `lvl${this.lvl}`
    )}`;
  }

  public isArray(potentialArray: any): boolean {
    return Array.isArray(potentialArray);
  }

  public handleClick(event: MouseEvent, item: HierarchicalMenuItem): void {
    event.preventDefault();
    event.stopPropagation();

    this.refine(item.value);
  }
}
