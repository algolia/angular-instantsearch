import { Component, Input, Inject, forwardRef, Optional } from '@angular/core';
import { connectClearRefinements } from 'instantsearch.js/es/connectors';
import { BaseWidget } from '../base-widget';
import { NgAisInstantSearch } from '../instantsearch/instantsearch';
import { NgAisIndex } from '../index-widget/index-widget';
import { noop } from '../utils';

type ClearRefinementsState = {
  hasRefinements: boolean;
  refine: () => void;
  createURL: () => string;
};

@Component({
  selector: 'ais-clear-refinements',
  template: `
    <div
      [class]="cx()"
      *ngIf="!isHidden"
    >
      <button
        [class]="cx('button') + (!state.hasRefinements ? (' ' + cx('button', 'disabled')) : '')"
        (click)="handleClick($event)"
        [disabled]="!state.hasRefinements"
      >
        {{resetLabel}}
      </button>
    </div>
  `,
})
export class NgAisClearRefinements extends BaseWidget {
  // rendering options
  @Input() public resetLabel: string = 'Clear refinements';

  // instance options
  @Input() public includedAttributes: string[];
  @Input() public excludedAttributes: string[];
  @Input() public transformItems?: (items: string[]) => string[];

  public state: ClearRefinementsState = {
    hasRefinements: false,
    refine: noop,
    createURL: () => '#',
  };

  get isHidden(): boolean {
    return !this.state.hasRefinements && this.autoHideContainer;
  }

  constructor(
    @Inject(forwardRef(() => NgAisIndex))
    @Optional()
    public parentIndex: NgAisIndex,
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchInstance: NgAisInstantSearch
  ) {
    super('ClearRefinements');
  }

  public ngOnInit() {
    this.createWidget(connectClearRefinements, {
      includedAttributes: this.includedAttributes,
      excludedAttributes: this.excludedAttributes,
      transformItems: this.transformItems,
    });

    super.ngOnInit();
  }

  public handleClick(event: MouseEvent) {
    event.preventDefault();

    if (this.state.hasRefinements) {
      this.state.refine();
    }
  }
}
