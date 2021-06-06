import { Component, Input, Inject, forwardRef, Optional } from '@angular/core';

import { EXPERIMENTAL_connectConfigureRelatedItems } from 'instantsearch.js/es/connectors';
import { BaseWidget } from '../base-widget';
import { NgAisInstantSearch } from '../instantsearch/instantsearch';
import { NgAisIndex } from '../index-widget/index-widget';
import { AlgoliaHit } from 'instantsearch.js';
import { ConfigureRelatedItemsConnectorParams } from 'instantsearch.js/es/connectors/configure-related-items/connectConfigureRelatedItems';

type x = ConfigureRelatedItemsConnectorParams;

@Component({
  selector: 'ais-experimental-configure-related-items',
  template: '',
})
export class NgAisConfigureRelatedItems extends BaseWidget {
  @Input() hit: ConfigureRelatedItemsConnectorParams['hit'];
  @Input()
  public matchingPatterns: ConfigureRelatedItemsConnectorParams['matchingPatterns'];
  @Input()
  public transformSearchParameters: ConfigureRelatedItemsConnectorParams['transformSearchParameters'];

  constructor(
    @Inject(forwardRef(() => NgAisIndex))
    @Optional()
    public parentIndex: NgAisIndex,
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchInstance: NgAisInstantSearch
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