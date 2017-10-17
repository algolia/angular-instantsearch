import { Component, Input } from "@angular/core";

@Component({
  selector: "ngis-footer",
  template: `
    <div *ngIf="footer" class="{{className}}">
      {{footer}}
    </div>
  `
})
export class NgISFooter {
  @Input() public footer?: string;
  @Input() public className: string;
}
