import {
  Component,
  ContentChild,
  TemplateRef,
  Inject,
  forwardRef,
  Input,
} from '@angular/core';

import { connectQueryRules } from 'instantsearch.js/es/connectors';

import { BaseWidget } from '../base-widget';
import { NgAisInstantSearch } from '../instantsearch/instantsearch';

@Component({
  selector: 'ais-query-rule-custom-data',
  template: `
    <div [class]="cx()">
      <ng-container *ngTemplateOutlet="template; context: templateContext">
      </ng-container>

      <div *ngIf="!template">
        <div *ngFor="let item of state.items">
          <pre>{{ item | json }}</pre>
        </div>
      </div>
    </div>
  `,
})
export class NgAisQueryRuleCustomData extends BaseWidget {
  @ContentChild(TemplateRef) public template: any;

  @Input() public transformItems?: (items: any[]) => any[];

  public state = {
    items: [],
  };

  get templateContext() {
    return {
      items: this.state.items,
    };
  }

  constructor(
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchParent: any
  ) {
    super('QueryRuleCustomData');
  }

  public ngOnInit() {
    this.createWidget(connectQueryRules, {
      transformItems: this.transformItems,
    });

    super.ngOnInit();
  }
}
