import { Component, Input } from "@angular/core";
import { bem } from "../utils";

@Component({
  selector: "ng-ais-hierarchical-menu-item",
  template: `
    <li
      [class]="cx('item') + (item.isRefined ? (' ' + cx('item', 'selected')) : '')"
      (click)="handleClick($event, item)"
    >
      <a
        [class]="cx('link')"
        href="{{createURL(item.value)}}"
        (click)="handleClick($event, item)"
      >
        {{item.label}}
        <span [class]="cx('count')">
          {{item.count}}
        </span>
      </a>

      <ul
        [class]="cx('list') + ' ' + cx('list', 'lvl' + lvl)"
        *ngIf="item.isRefined && isArray(item.data) && item.data.length > 0"
      >
        <ng-ais-hierarchical-menu-item
          *ngFor="let child of item.data"
          [item]="child"
          [createURL]="createURL"
          [refine]="refine"
          [lvl]="lvl + 1"
        >
        </ng-ais-hierarchical-menu-item>
      </ul>
    </li>
  `
})
export class NgAisHierarchicalMenuItem {
  @Input() public lvl: number = 1;
  @Input() public refine: (value: string) => void;
  @Input() public createURL: () => string;
  @Input() public item: HierarchicalMenuItem;

  public cx = bem("HierarchicalMenu");

  public isArray(potentialArray: any) {
    return Array.isArray(potentialArray);
  }

  public handleClick(event: MouseEvent, item: HierarchicalMenuItem) {
    event.preventDefault();
    event.stopPropagation();

    this.refine(item.value);
  }
}
