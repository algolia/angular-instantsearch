import { Component, Input, Inject, forwardRef, Optional } from '@angular/core';
import { connectClearRefinements } from 'instantsearch.js/es/connectors';
import {
  ClearRefinementsConnectorParams,
  ClearRefinementsWidgetDescription,
  ClearRefinementsRenderState,
} from 'instantsearch.js/es/connectors/clear-refinements/connectClearRefinements';
import { TypedBaseWidget } from '../typed-base-widget';
import { NgAisInstantSearch } from '../instantsearch/instantsearch';
import { NgAisIndex } from '../index-widget/index-widget';
import { noop } from '../utils';

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
export class NgAisClearRefinements extends TypedBaseWidget<
  ClearRefinementsWidgetDescription,
  ClearRefinementsConnectorParams
> {
  // rendering options
  @Input() public resetLabel: string = 'Clear refinements';

  // instance options
  @Input()
  public includedAttributes: ClearRefinementsConnectorParams['includedAttributes'];
  @Input()
  public excludedAttributes: ClearRefinementsConnectorParams['excludedAttributes'];
  @Input()
  public transformItems?: ClearRefinementsConnectorParams['transformItems'];

  public state: ClearRefinementsRenderState = {
    hasRefinements: false,
    canRefine: false,
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
