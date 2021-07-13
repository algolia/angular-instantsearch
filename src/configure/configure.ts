import {
  Component,
  Input,
  Inject,
  forwardRef,
  KeyValueDiffer,
  KeyValueDiffers,
  Optional,
} from '@angular/core';

import { connectConfigure } from 'instantsearch.js/es/connectors';
import { ConfigureConnectorParams } from 'instantsearch.js/es/connectors/configure/connectConfigure';
import { BaseWidget } from '../base-widget';
import { NgAisInstantSearch } from '../instantsearch/instantsearch';
import { NgAisIndex } from '../index-widget/index-widget';
import { noop } from '../utils';

export type ConfigureState = {
  refine: Function;
};

type SearchParameters = ConfigureConnectorParams['searchParameters'];

@Component({
  selector: 'ais-configure',
  template: '',
})
export class NgAisConfigure extends BaseWidget {
  // instance options
  private internalSearchParameters: SearchParameters;

  private differ: KeyValueDiffer<string, any>; // SearchParameters (I don't know how to get the values of the type)

  public state: ConfigureState = {
    refine: noop,
  };

  constructor(
    private differs: KeyValueDiffers,
    @Inject(forwardRef(() => NgAisIndex))
    @Optional()
    public parentIndex: NgAisIndex,
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchInstance: NgAisInstantSearch
  ) {
    super('Configure');
  }

  @Input()
  set searchParameters(values: SearchParameters) {
    this.internalSearchParameters = values;
    if (!this.differ && values) {
      this.differ = this.differs.find(values).create();
    }
  }

  public ngOnInit() {
    this.createWidget(connectConfigure, {
      searchParameters: this.internalSearchParameters,
    });
    super.ngOnInit();
  }

  ngDoCheck() {
    if (this.differ) {
      const changes = this.differ.diff(this.internalSearchParameters);
      if (changes) {
        this.state.refine(this.internalSearchParameters);
      }
    }
  }
}
