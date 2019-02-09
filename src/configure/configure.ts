import {
  Component,
  Input,
  Inject,
  forwardRef,
  KeyValueDiffer,
  KeyValueDiffers,
} from '@angular/core';

import { connectConfigure } from 'instantsearch.js/es/connectors';
import { BaseWidget } from '../base-widget';
import {
  NgAisInstantSearch,
  SearchParameters,
} from '../instantsearch/instantsearch';
import { noop } from '../utils';

@Component({
  selector: 'ais-configure',
  template: '',
})
export class NgAisConfigure extends BaseWidget {
  private internalSearchParameters: SearchParameters;
  private differ: KeyValueDiffer<string, any>; // SearchParameters (I don't know how to get the values of the type)

  public state: { refine: Function } = {
    refine: noop,
  };

  constructor(
    private differs: KeyValueDiffers,
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchParent: any
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
