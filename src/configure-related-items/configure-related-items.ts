import { Component, Input, Inject, forwardRef, Optional } from '@angular/core';

import { EXPERIMENTAL_connectConfigureRelatedItems } from 'instantsearch.js/es/connectors';
import { BaseWidget } from '../base-widget';
import { NgAisInstantSearch } from '../instantsearch/instantsearch';
import { NgAisIndex } from '../index-widget/index-widget';

@Component({
  selector: 'ais-experimental-configure-related-items',
  template: '',
})
export class NgAisConfigureRelatedItems extends BaseWidget {
  @Input() public hit: object;
  @Input() public matchingPatterns: object;
  @Input() public transformSearchParameters: Function;

  constructor(
    @Inject(forwardRef(() => NgAisIndex))
    @Optional()
    public indexParent: NgAisIndex,
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchParent: NgAisInstantSearch
  ) {
    super('ExperimentalConfigureRelatedItems');
  }

  public ngOnInit() {
    this.createWidget(EXPERIMENTAL_connectConfigureRelatedItems, {
      hit: this.hit,
      matchingPatterns: this.matchingPatterns,
      transformSearchParameters: this.transformSearchParameters,
    });

    super.ngOnInit();
  }
}
