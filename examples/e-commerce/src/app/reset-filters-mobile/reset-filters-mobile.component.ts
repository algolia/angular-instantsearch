import { Component, Inject, forwardRef, Optional } from '@angular/core';
import {
  BaseWidget,
  NgAisInstantSearch,
  NgAisIndex,
} from 'angular-instantsearch';
import { connectClearRefinements } from 'instantsearch.js/es/connectors';

@Component({
  selector: 'app-reset-filters-mobile',
  template: `
    <div class="ais-ClearRefinements">
      <button
        type="button"
        class="ais-ClearRefinements-button"
        (click)="handleClick($event)"
      >
        Reset filters
      </button>
    </div>
  `,
})
export class ResetFiltersMobile extends BaseWidget {
  public state = {
    hasRefinements: false,
    refine: () => {},
    createURL: () => '#',
  };

  constructor(
    @Inject(forwardRef(() => NgAisIndex))
    @Optional()
    public parentIndex: NgAisIndex,
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchInstance: NgAisInstantSearch
  ) {
    super('ClearFiltersMobile');
  }

  public ngOnInit() {
    this.createWidget(connectClearRefinements);
    super.ngOnInit();
  }

  public handleClick(event: MouseEvent) {
    event.preventDefault();

    if (this.state.hasRefinements) {
      this.state.refine();
    }

    document.body.classList.remove('filtering');
    const resultsContainer = document.querySelector('.container-results');
    resultsContainer.scrollIntoView();
  }
}
