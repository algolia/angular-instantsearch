import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter
} from "@angular/core";

import {
  NgAisInstance,
  InstantSearchConfig,
  InstantSearchInstance
} from "./instantsearch-instance";

@Component({
  selector: "ng-ais-instantsearch",
  template: `<ng-content></ng-content>`
})
export class NgAisInstantSearch implements AfterViewInit, OnInit, OnDestroy {
  @Input() public config: InstantSearchConfig;
  @Input() public instanceName: string = "default";

  @Output()
  change: EventEmitter<{ results: {}; state: {} }> = new EventEmitter<{
    results: {};
    state: {};
  }>();

  public searchInstance: InstantSearchInstance;

  constructor(private instantSearchInstances: NgAisInstance) {}

  public ngOnInit() {
    this.searchInstance = this.instantSearchInstances.init(
      this.config,
      this.instanceName
    );

    this.searchInstance.on("render", this.onInstantSearchRender);
  }

  public ngAfterViewInit() {
    this.searchInstance.start();
  }

  public ngOnDestroy() {
    this.searchInstance.removeListener("render", this.onInstantSearchRender);
    this.instantSearchInstances.dispose(this.instanceName);
  }

  onInstantSearchRender = () => {
    this.change.emit({
      results: this.searchInstance.helper.lastResults,
      state: this.searchInstance.helper.state
    });
  };
}
