import { Component, Inject, forwardRef, Input } from "@angular/core";
import { BaseWidget, NgAisInstantSearch } from "angular-instantsearch";
import { connectMenu } from "instantsearch.js/es/connectors";

@Component({
  selector: "ais-menu-select",
  template: `
    <select
      class="menu-select"
      (change)="state.refine($event.target.value)"
    >
      <option
        *ngFor="let item of state.items"
        [value]="item.value"
        [selected]="item.isRefined"
      >
        {{item.label}}
      </option>
    </select>
  `
})
export class MenuSelect extends BaseWidget {
  @Input() attribute: string;
  state: {
    items: { label: string; value: string }[];
    createURL: () => string;
    refine: (value: string) => void;
    canRefine: boolean;
    isShowingMore: boolean;
    toggleShowMore: () => void;
    canToggleShowMore: boolean;
  };

  constructor(
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchParent: any
  ) {
    super("MenuSelect");
  }

  public ngOnInit() {
    this.createWidget(connectMenu, { attributeName: this.attribute });
    super.ngOnInit();
  }
}
