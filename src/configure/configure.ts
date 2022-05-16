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
import {
  ConfigureWidgetDescription,
  ConfigureRenderState,
  ConfigureConnectorParams,
} from 'instantsearch.js/es/connectors/configure/connectConfigure';
import { TypedBaseWidget } from '../typed-base-widget';
import { NgAisInstantSearch } from '../instantsearch/instantsearch';
import { NgAisIndex } from '../index-widget/index-widget';
import { noop } from '../utils';

@Component({
  selector: 'ais-configure',
  template: '',
})
export class NgAisConfigure extends TypedBaseWidget<
  ConfigureWidgetDescription,
  ConfigureConnectorParams
> {
  // instance options
  private internalSearchParameters: ConfigureConnectorParams['searchParameters'];

  private differ: KeyValueDiffer<string, any>;

  public state: ConfigureRenderState = {
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
  set searchParameters(values: ConfigureConnectorParams['searchParameters']) {
    this.internalSearchParameters = values;
    if (!this.differ && values) {
      this.differ = this.differs.find(values).create();
    }
  }

  public ngOnInit() {
    this.createWidget(
      connectConfigure,
      {
        searchParameters: this.internalSearchParameters,
      },
      {
        $$widgetType: 'ais.configure',
      }
    );
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
