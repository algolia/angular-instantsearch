import {
  Inject,
  Input,
  Component,
  ContentChild,
  TemplateRef,
  forwardRef,
} from '@angular/core';

import { connectHitsWithInsights } from 'instantsearch.js/es/connectors';
import { BaseWidget } from '../base-widget';
import { NgAisInstantSearch, Hit } from '../instantsearch/instantsearch';

export type HitsState = {
  hits: Hit[];
  results: {};
};

@Component({
  selector: 'ais-hits',
  template: `
    <div [class]="cx()">
      <ng-container *ngTemplateOutlet="template; context: state"></ng-container>

      <!-- default rendering if no template specified -->
      <div *ngIf="!template">
        <ul [class]="cx('list')">
          <li
            [class]="cx('item')"
            *ngFor="let hit of state.hits"
          >
            <ais-highlight attribute="name" [hit]="hit">
            </ais-highlight>
          </li>
        </ul>
      </div>
    </div>
  `,
})
export class NgAisHits extends BaseWidget {
  @ContentChild(TemplateRef) public template?: TemplateRef<any>;

  @Input() public escapeHTML?: boolean;
  @Input() public transformItems?: <U extends Hit>(items: Hit[]) => U[];

  public state: HitsState = {
    hits: [],
    results: {},
  };

  constructor(
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchParent: any
  ) {
    super('Hits');
  }

  ngOnInit() {
    this.createWidget(connectHitsWithInsights, {
      escapeHTML: this.escapeHTML,
      transformItems: this.transformItems,
    });
    super.ngOnInit();
  }

  updateState = (state, isFirstRendering: boolean) => {
    if (isFirstRendering) return;
    this.state = state;
  };
}
