import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NgAisNumericSelector } from "./numeric-selector";

@NgModule({
  declarations: [NgAisNumericSelector],
  entryComponents: [NgAisNumericSelector],
  exports: [NgAisNumericSelector],
  imports: [CommonModule]
})
export class NgAisNumericSelectorModule {}
