import { Component, Input } from "@angular/core";
import { bem } from "../utils";

const cx = bem("HierarchicalMenu");

interface Item {
  value: string;
  label: string;
  count: number;
  isRefined: boolean;
  data: Item[];
}

@Component({
  selector: "ngis-hierarchical-menu-item",
  template: `
    <li
      [ngClass]="{
        '${cx("item")}': true,
        '${cx("item", "selected")}': item.isRefined
      }"
      (click)="handleClick($event, item)"
    >
      <a
        class="${cx("link")}"
        href="{{createURL(item.value)}}"
        (click)="handleClick($event, item)"
      >
        {{item.label}}
        <span class="${cx("count")}">
          {{item.count}}
        </span>
      </a>

      <ul
        class="{{cx('list')}} {{cx('list', 'lvl' + lvl)}}"
        *ngIf="item.isRefined && isArray(item.data) && item.data.length > 0"
      >
        <ngis-hierarchical-menu-item
          *ngFor="let child of item.data"
          [item]="child"
          [createURL]="createURL"
          [refine]="refine"
          [lvl]="lvl + 1"
        >
        </ngis-hierarchical-menu-item>
      </ul>
    </li>
  `
})
export class NgISHierarchicalMenuItem {
  @Input() public lvl: number = 1;
  @Input() public refine: (value: string) => void;
  @Input() public createURL: () => string;
  @Input() public item: Item;

  public cx = cx;

  public isArray(potentialArray) {
    return Array.isArray(potentialArray);
  }

  public handleClick(event, item) {
    event.preventDefault();
    event.stopPropagation();

    this.refine(item.value);
  }
}
