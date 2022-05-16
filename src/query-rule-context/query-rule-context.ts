import { Component, Input, Inject, forwardRef, Optional } from '@angular/core';

import { connectQueryRules } from 'instantsearch.js/es/connectors';
import { TypedBaseWidget } from '../typed-base-widget';
import { NgAisInstantSearch } from '../instantsearch/instantsearch';
import { NgAisIndex } from '../index-widget/index-widget';
import {
  QueryRulesConnectorParams,
  QueryRulesWidgetDescription,
} from 'instantsearch.js/es/connectors/query-rules/connectQueryRules';

@Component({
  selector: 'ais-query-rule-context',
  template: '',
})
export class NgAisQueryRuleContext extends TypedBaseWidget<
  QueryRulesWidgetDescription,
  QueryRulesConnectorParams
> {
  @Input() public trackedFilters: QueryRulesConnectorParams['trackedFilters'];
  @Input()
  public transformRuleContexts?: QueryRulesConnectorParams['transformRuleContexts'];

  constructor(
    @Inject(forwardRef(() => NgAisIndex))
    @Optional()
    public parentIndex: NgAisIndex,
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchInstance: NgAisInstantSearch
  ) {
    super('QueryRuleContext');
  }

  public ngOnInit() {
    this.createWidget(
      connectQueryRules,
      {
        trackedFilters: this.trackedFilters,
        transformRuleContexts: this.transformRuleContexts,
      },
      {
        $$widgetType: 'ais.queryRuleContext',
      }
    );

    super.ngOnInit();
  }
}
