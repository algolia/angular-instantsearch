import { Component, Input } from '@angular/core';

@Component({
  selector: 'ais-panel',
  template: `
    <div class="ais-Panel">
      <div *ngIf="header" class="ais-Panel-header">
        {{header}}
      </div>

      <div class="ais-Panel-body">
        <ng-content></ng-content>
      </div>

      <div *ngIf="footer" class="ais-Panel-footer">
        {{footer}}
      </div>
    </div>
  `,
})
export class NgAisPanel {
  @Input() public header?: string;
  @Input() public footer?: string;
}
