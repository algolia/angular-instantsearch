import { AfterViewInit, Component, Input, OnInit } from "@angular/core";

import { NgISInstance } from "./instantsearch-instance";

@Component({
  selector: "ngis-instantsearch",
  template: `<ng-content></ng-content>`
})
export class NgISInstantSearch implements AfterViewInit, OnInit {
  @Input() public config: InstantSearchConfig;

  constructor(private searchInstance: NgISInstance) {}

  public ngOnInit() {
    this.searchInstance.init(this.config);
  }

  public ngAfterViewInit() {
    this.searchInstance.start();
  }
}
