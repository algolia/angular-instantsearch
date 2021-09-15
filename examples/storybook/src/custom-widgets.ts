import {
  Component,
  OnInit,
  forwardRef,
  Inject,
  Optional,
  Input,
} from '@angular/core';
import {
  TypedBaseWidget,
  NgAisInstantSearch,
  NgAisIndex,
} from 'angular-instantsearch';
import { Connector } from 'instantsearch.js/es/types';
import { connectMenu } from 'instantsearch.js/es/connectors';
import {
  MenuConnectorParams,
  MenuWidgetDescription,
  MenuRenderState,
} from 'instantsearch.js/es/connectors/menu/connectMenu';

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
export class MenuSelect
  extends TypedBaseWidget<MenuWidgetDescription, MenuConnectorParams>
  implements OnInit {

  public state: MenuRenderState = {
    items: [],
    refine: () => {},
    createURL: () => '#',
    canRefine: false,
    isShowingMore: false,
    canToggleShowMore: false,
    toggleShowMore: () => {},
    sendEvent: () => {},
  };

  constructor(
    @Inject(forwardRef(() => NgAisIndex))
    @Optional()
    public parentIndex: NgAisIndex,
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchInstance: NgAisInstantSearch
  ) {
    super('MenuSelect');
  }

  public ngOnInit() {
    this.createWidget(connectMenu, {
      attribute: 'brand',
    });

    super.ngOnInit();
  }
}

type NoopWidgetDescription = {
  $$type: 'demo.noop';
};

const connectNoop: Connector<
  NoopWidgetDescription,
  Record<string, unknown>
> = function(renderFn, unmountFn = () => {}) {
  return function(widgetParams) {
    return {
      $$type: 'demo.noop',
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
export class Refresh
  extends TypedBaseWidget<NoopWidgetDescription, Record<string, unknown>>
  implements OnInit {
  constructor(
    @Inject(forwardRef(() => NgAisIndex))
    @Optional()
    public parentIndex: NgAisIndex,
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchInstance: NgAisInstantSearch
  ) {
    super('Refresh');
  }
  public ngOnInit() {
    this.createWidget(connectNoop, {});
    super.ngOnInit();
  }
  refresh() {
    this.instantSearchInstance.refresh();
  }
}
