import { Component, Input, Inject, forwardRef } from '@angular/core';

import { connectQueryRules } from 'instantsearch.js/es/connectors';
import { BaseWidget } from '../base-widget';
import { NgAisInstantSearch } from '../instantsearch/instantsearch';

type FacetValue = string | number | boolean;

@Component({
  selector: 'ais-query-rule-context',
  template: '',
})
export class NgAisQueryRuleContext extends BaseWidget {
  @Input()
  public trackedFilters: {
    [facetName: string]: (facetValues: FacetValue[]) => FacetValue[];
  };
  @Input() public transformRuleContexts?: (items: string[]) => string[];

  constructor(
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchParent: any
  ) {
    super('QueryRuleContext');
  }

  public ngOnInit() {
    this.createWidget(connectQueryRules, {
      trackedFilters: this.trackedFilters,
      transformRuleContexts: this.transformRuleContexts,
    });

    super.ngOnInit();
  }
}
