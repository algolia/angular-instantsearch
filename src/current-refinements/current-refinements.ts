import { Component, Input, Inject, forwardRef } from "@angular/core";

import { connectCurrentRefinedValues } from "instantsearch.js/es/connectors";
import { BaseWidget } from "../base-widget";
import { NgAisInstantSearch } from "../instantsearch/instantsearch";

export type CurrentRefinementsState = {
  attributes: {};
  clearAllClick: Function;
  clearAllURL: Function;
  createURL: Function;
  refine: Function;
  refinements: {}[];
};

@Component({
  selector: "ais-current-refinements",
  template: `
    <div
      [class]="cx()"
      *ngIf="!isHidden"
    >
      <button
        [class]="cx('reset')"
        (click)="handleClearAllClick($event)"
        *ngIf="clearRefinements === 'before' || clearRefinements === true">
        {{clearRefinementsLabel}}
      </button>

      <ul
        [class]="cx('list')"
        *ngFor="let refinement of refinements"
      >
        <li [class]="cx('item')">
          <span [class]="cx('label')">{{refinement.label}}:</span>

          <span
            [class]="cx('category')"
            *ngFor="let item of refinement.items"
          >
            <span [class]="cx('categoryLabel')">{{item.name}}</span>
            <button [class]="cx('delete')" (click)="handleClick($event, item)">✕</button>
          </span>
        </li>
      </ul>

      <button
        [class]="cx('reset')"
        (click)="handleClearAllClick($event)"
        *ngIf="clearRefinements === 'after'">
        {{clearRefinementsLabel}}
      </button>
    </div>
  `
})
export class NgAisCurrentRefinements extends BaseWidget {
  // render options
  @Input() public clearRefinements: "before" | "after" | boolean = "after";
  @Input() public clearRefinementsLabel: string = "Clear refinements";
  @Input() public transformItems?: Function;

  // connector options
  @Input() public onlyListedAttributes: boolean = false;
  @Input() public clearsQuery: boolean = false;
  @Input()
  public attributes: {
    name: string;
    label: string;
  }[] = [];

  public state: CurrentRefinementsState = {
    attributes: {},
    clearAllClick: () => {},
    clearAllURL: () => {},
    createURL: () => {},
    refine: () => {},
    refinements: []
  };

  get isHidden() {
    return this.state.refinements.length === 0 && this.autoHideContainer;
  }

  get refinements() {
    const items =
      typeof this.transformItems === "function"
        ? this.transformItems(this.state.refinements)
        : this.state.refinements;

    // group refinements by category? (attributeName && type)
    return items.reduce((res, { type, attributeName, ...refinement }) => {
      const match = res.find(
        r => r.attributeName === attributeName && r.type === type
      );
      if (match) {
        match.items.push({ type, attributeName, ...refinement });
      } else {
        res.push({
          type,
          attributeName,
          label: capitalize(attributeName),
          items: [{ type, attributeName, ...refinement }]
        });
      }
      return res;
    }, []);
  }

  get json() {
    return JSON.stringify(this.refinements, null, 4);
  }

  constructor(
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchParent: any
  ) {
    super("CurrentRefinements");
  }

  public ngOnInit() {
    this.createWidget(connectCurrentRefinedValues, {
      attributes: this.attributes,
      clearsQuery: this.clearsQuery,
      onlyListedAttributes: this.onlyListedAttributes
    });
    super.ngOnInit();
  }

  public handleClick(event: MouseEvent, refinement: {}) {
    event.preventDefault();
    this.state.refine(refinement);
  }

  public handleClearAllClick(event: MouseEvent) {
    event.preventDefault();
    this.state.clearAllClick();
  }
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
