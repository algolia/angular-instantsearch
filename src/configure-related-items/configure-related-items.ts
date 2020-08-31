import {
  Component,
  Input,
  Inject,
  forwardRef,
  Optional,
  KeyValueDiffer,
  KeyValueDiffers,
} from '@angular/core';

import { EXPERIMENTAL_connectConfigureRelatedItems } from 'instantsearch.js/es/connectors';
import { BaseWidget } from '../base-widget';
import { NgAisInstantSearch } from '../instantsearch/instantsearch';
import { NgAisIndex } from '../index-widget/index-widget';
import { AlgoliaHit } from 'instantsearch.js';

@Component({
  selector: 'ais-experimental-configure-related-items',
  template: '',
})
export class NgAisConfigureRelatedItems extends BaseWidget {
  private internalHit: AlgoliaHit;
  private differ: KeyValueDiffer<string, any>;

  @Input() public matchingPatterns: object;
  @Input() public transformSearchParameters: Function;

  constructor(
    private differs: KeyValueDiffers,
    @Inject(forwardRef(() => NgAisIndex))
    @Optional()
    public parentIndex: NgAisIndex,
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchInstance: NgAisInstantSearch
  ) {
    super('ExperimentalConfigureRelatedItems');
  }

  @Input()
  set hit(values: AlgoliaHit) {
    this.internalHit = values;
    if (!this.differ && values) {
      this.differ = this.differs.find(values).create();
    }
  }

  public ngOnInit() {
    this.createWidget(EXPERIMENTAL_connectConfigureRelatedItems, {
      hit: this.internalHit,
      matchingPatterns: this.matchingPatterns,
      transformSearchParameters: this.transformSearchParameters,
    });

    super.ngOnInit();
  }

  ngDoCheck() {
    if (this.differ) {
      const changes = this.differ.diff(this.internalHit);
      if (changes) {
        this.parent.removeWidgets([this.widget]);
        this.createWidget(EXPERIMENTAL_connectConfigureRelatedItems, {
          hit: this.internalHit,
          matchingPatterns: this.matchingPatterns,
          transformSearchParameters: this.transformSearchParameters,
        });
      }
    }
  }
}
