import {
  Component,
  ContentChild,
  TemplateRef,
  Inject,
  forwardRef,
  Input,
  Optional,
} from '@angular/core';

import { connectQueryRules } from 'instantsearch.js/es/connectors';
import {
  QueryRulesConnectorParams,
  QueryRulesWidgetDescription,
  QueryRulesRenderState,
} from 'instantsearch.js/es/connectors/query-rules/connectQueryRules';

import { TypedBaseWidget } from '../typed-base-widget';
import { NgAisInstantSearch } from '../instantsearch/instantsearch';
import { NgAisIndex } from '../index-widget/index-widget';

@Component({
  selector: 'ais-query-rule-custom-data',
  template: `
    <div [class]='cx()'>
      <ng-container *ngTemplateOutlet='template; context: templateContext'>
      </ng-container>

      <div *ngIf='!template'>
        <div *ngFor='let item of state.items'>
          <pre>{{ item | json }}</pre>
        </div>
      </div>
    </div>
  `,
})
export class NgAisQueryRuleCustomData extends TypedBaseWidget<
  QueryRulesWidgetDescription,
  QueryRulesConnectorParams
> {
  @ContentChild(TemplateRef, { static: false })
  public template: any;

  @Input() public transformItems?: QueryRulesConnectorParams['transformItems'];

  public state: QueryRulesRenderState = {
    items: [],
  };

  get templateContext() {
    return {
      items: this.state.items,
    };
  }

  constructor(
    @Inject(forwardRef(() => NgAisIndex))
    @Optional()
    public parentIndex: NgAisIndex,
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchInstance: NgAisInstantSearch
  ) {
    super('QueryRuleCustomData');
  }

  public ngOnInit() {
    this.createWidget(
      connectQueryRules,
      {
        transformItems: this.transformItems,
      },
      {
        $$widgetType: 'ais.queryRuleCustomData',
      }
    );

    super.ngOnInit();
  }
}
