import { Component, Input, Inject, forwardRef, Optional } from '@angular/core';

import { connectToggleRefinement } from 'instantsearch.js/es/connectors';
import { TypedBaseWidget } from '../typed-base-widget';
import { NgAisInstantSearch } from '../instantsearch/instantsearch';
import { NgAisIndex } from '../index-widget/index-widget';
import { noop } from '../utils';
import {
  ToggleRefinementConnectorParams,
  ToggleRefinementWidgetDescription,
  ToggleRefinementRenderState,
} from 'instantsearch.js/es/connectors/toggle-refinement/connectToggleRefinement';

@Component({
  selector: 'ais-toggle',
  template: `
    <div [class]='cx()'>
      <label [class]="cx('label')">
        <input
          [class]="cx('checkbox')"
          type='checkbox'
          value='{{state.value.name}}'
          [checked]='state.value.isRefined'
          (change)='handleChange($event)'
        />

        <span [class]="cx('labelText')">
          {{label || state.value.name}}
        </span>

        <span [class]="cx('count')">{{state.value.count}}</span>
      </label>
    </div>
  `,
})
export class NgAisToggle extends TypedBaseWidget<
  ToggleRefinementWidgetDescription,
  ToggleRefinementConnectorParams
> {
  // rendering options
  @Input() public label: string;

  // instance options
  @Input() public attribute: ToggleRefinementConnectorParams['attribute'];
  @Input() public on?: ToggleRefinementConnectorParams['on'];
  @Input() public off?: ToggleRefinementConnectorParams['off'];

  public state: ToggleRefinementRenderState = {
    canRefine: false,
    sendEvent: undefined,
    value: {
      count: undefined,
      isRefined: false,
      name: '',
      offFacetValue: undefined,
      onFacetValue: undefined,
    },
    createURL: () => '#',
    refine: noop,
  };

  constructor(
    @Inject(forwardRef(() => NgAisIndex))
    @Optional()
    public parentIndex: NgAisIndex,
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchInstance: NgAisInstantSearch
  ) {
    super('ToggleRefinement');
  }

  public ngOnInit() {
    this.createWidget(connectToggleRefinement, {
      attribute: this.attribute,
      on: this.on,
      off: this.off,
    });
    super.ngOnInit();
  }

  public handleChange(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.state.refine(this.state.value);
  }
}
