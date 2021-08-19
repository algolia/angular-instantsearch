import { Component, forwardRef, Inject, Input, Optional } from '@angular/core';

import { EXPERIMENTAL_connectConfigureRelatedItems } from 'instantsearch.js/es/connectors';
import { TypedBaseWidget } from '../typed-base-widget';
import { NgAisInstantSearch } from '../instantsearch/instantsearch';
import { NgAisIndex } from '../index-widget/index-widget';
import {
  ConfigureRelatedItemsConnectorParams,
  ConfigureRelatedItemsWidgetDescription,
} from 'instantsearch.js/es/connectors/configure-related-items/connectConfigureRelatedItems';

@Component({
  selector: 'ais-experimental-configure-related-items',
  template: '',
})
export class NgAisConfigureRelatedItems extends TypedBaseWidget<
  ConfigureRelatedItemsWidgetDescription,
  ConfigureRelatedItemsConnectorParams
> {
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
