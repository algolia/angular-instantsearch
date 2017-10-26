import { AfterViewInit, Component, Input, OnInit } from "@angular/core";

import { NgAisInstance } from "./instantsearch-instance";

@Component({
  selector: "ng-ais-instantsearch",
  template: `<ng-content></ng-content>`
})
export class NgAisInstantSearch implements AfterViewInit, OnInit {
  @Input() public config: InstantSearchConfig;

  constructor(private searchInstance: NgAisInstance) {}

  public ngOnInit() {
    this.searchInstance.init(this.config);
  }

  public ngAfterViewInit() {
    this.searchInstance.start();
  }
}
