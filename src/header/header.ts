import { Component, Input } from "@angular/core";

@Component({
  selector: "ng-ais-header",
  template: `
    <div *ngIf="header" class="{{className}}">
      {{header}}
    </div>
  `
})
export class NgAisHeader {
  @Input() public header?: string;
  @Input() public className: string;
}
