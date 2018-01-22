import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NgAisNumericRange } from "./numeric-range";

@NgModule({
  declarations: [NgAisNumericRange],
  entryComponents: [NgAisNumericRange],
  exports: [NgAisNumericRange],
  imports: [CommonModule]
})
export class NgAisNumericRangeModule {}
