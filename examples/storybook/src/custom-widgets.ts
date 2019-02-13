import { Component, OnInit, Inject, forwardRef } from '@angular/core';
import {
  BaseWidget,
  NgAisInstantSearch,
  Widget,
  Connector,
} from 'angular-instantsearch';
import { connectMenu } from 'instantsearch.js/es/connectors';

@Component({
  selector: 'ais-menu-select',
  template: `
    <select
      class="menu-select"
      (change)="state.refine($event.target.value)"
    >
      <option
        *ngFor="let item of state.items"
        [value]="item.value"
        [selected]="item.isRefined"
      >
        {{item.label}}
      </option>
    </select>
  `,
})
export class MenuSelect extends BaseWidget implements OnInit {
  constructor(
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchParent
  ) {
    super('MenuSelect');
  }

  public ngOnInit() {
    this.createWidget(connectMenu, { attribute: 'categories' });
    super.ngOnInit();
  }
}

const connectNoop: Connector = function(
  renderFn: (state: object, isFirstRendering: boolean) => void,
  unmountFn: () => void
) {
  return function(widgetParams?: object): Widget {
    return {
      init: ({ instantSearchInstance }) => {
        renderFn(
          {
            instantSearchInstance,
            widgetParams,
          },
          true
        );
      },
      render: ({ instantSearchInstance }) => {
        renderFn(
          {
            instantSearchInstance,
            widgetParams,
          },
          false
        );
      },
      dispose: () => unmountFn(),
    };
  };
};

@Component({
  selector: 'ais-refresh',
  template: `
    <button
      class="refresh"
      (click)="refresh()"
    >
      refresh
    </button>
  `,
})
export class Refresh extends BaseWidget implements OnInit {
  constructor(
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchParent: any
  ) {
    super('Refresh');
  }
  public ngOnInit() {
    this.createWidget(connectNoop);
    super.ngOnInit();
  }
  refresh() {
    this.instantSearchParent.refresh();
  }
}
