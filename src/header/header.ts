import { Component, Input } from "@angular/core";

@Component({
  selector: "ngis-header",
  template: `
    <div *ngIf="header" class="{{className}}">
      {{header}}
    </div>
  `
})
export class NgISHeader {
  @Input() public header?: string;
  @Input() public className: string;
}
