import { Component, Input } from "@angular/core";

@Component({
  selector: "ng-ais-footer",
  template: `
    <div *ngIf="footer" class="{{className}}">
      {{footer}}
    </div>
  `
})
export class NgAisFooter {
  @Input() public footer?: string;
  @Input() public className: string;
}
