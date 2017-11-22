import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter
} from "@angular/core";

import { NgAisInstance, InstantSearchConfig } from "./instantsearch-instance";

@Component({
  selector: "ng-ais-instantsearch",
  template: `<ng-content></ng-content>`
})
export class NgAisInstantSearch implements AfterViewInit, OnInit, OnDestroy {
  @Input() public config: InstantSearchConfig;

  @Output()
  change: EventEmitter<{ results: {}; state: {} }> = new EventEmitter<{
    results: {};
    state: {};
  }>();

  constructor(private searchInstance: NgAisInstance) {}

  public ngOnInit() {
    this.searchInstance.init(this.config);
    this.searchInstance.on("render", this.onInstantSearchRender);
  }

  public ngAfterViewInit() {
    this.searchInstance.start();
  }

  public ngOnDestroy() {
    this.searchInstance.off("render", this.onInstantSearchRender);
  }

  onInstantSearchRender = () => {
    const results = this.searchInstance.getResults();
    const state = this.searchInstance.getState();

    this.change.emit({ results, state });
  };
}
