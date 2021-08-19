import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
  Inject,
  PLATFORM_ID,
  VERSION as AngularVersion,
} from '@angular/core';

import * as algoliasearchProxy from 'algoliasearch/lite';
import instantsearch from 'instantsearch.js/es';

import { Widget } from '../typed-base-widget';
import { VERSION } from '../version';
import { InstantSearchOptions, InstantSearch } from 'instantsearch.js/es/types';
export { SearchClient, Hit } from 'instantsearch.js/es/types';
export {
  PlainSearchParameters as SearchParameters,
} from 'algoliasearch-helper';

// this is needed for different webpack/typescript configurations
const algoliasearch = algoliasearchProxy.default || algoliasearchProxy;

export type FacetSortByStringOptions =
  | 'count'
  | 'count:asc'
  | 'count:desc'
  | 'name'
  | 'name:asc'
  | 'name:desc'
  | 'isRefined';

export type InstantSearchConfig = InstantSearchOptions;
export type InstantSearchInstance = InstantSearch;

@Component({
  selector: 'ais-instantsearch',
  template: '<ng-content></ng-content>',
})
export class NgAisInstantSearch implements AfterViewInit, OnInit, OnDestroy {
  @Input() public config: InstantSearchConfig;
  @Input() public instanceName: string = 'default';

  @Output()
  change: EventEmitter<{ results: {}; state: {} }> = new EventEmitter<{
    results: {};
    state: {};
  }>();

  public instantSearchInstance: InstantSearchInstance;

  constructor(@Inject(PLATFORM_ID) public platformId: Object) {}

  public ngOnInit() {
    if (typeof this.config.searchClient.addAlgoliaAgent === 'function') {
      this.config.searchClient.addAlgoliaAgent(
        `angular (${AngularVersion.full})`
      );
      this.config.searchClient.addAlgoliaAgent(
        `angular-instantsearch (${VERSION})`
      );
    }

    this.instantSearchInstance = instantsearch(this.config);
    this.instantSearchInstance.on('render', this.onRender);
  }

  public ngAfterViewInit() {
    this.instantSearchInstance.start();
  }

  public ngOnDestroy() {
    if (this.instantSearchInstance) {
      this.instantSearchInstance.removeListener('render', this.onRender);
      this.instantSearchInstance.dispose();
    }
  }

  public addWidgets(widgets: Widget[]) {
    this.instantSearchInstance.addWidgets(widgets);
  }

  public removeWidgets(widgets: Widget[]) {
    this.instantSearchInstance.removeWidgets(widgets);
  }

  public refresh() {
    this.instantSearchInstance.refresh();
  }

  onRender = () => {
    this.change.emit({
      results: this.instantSearchInstance.helper.lastResults,
      state: this.instantSearchInstance.helper.state,
    });
  };
}
