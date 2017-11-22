import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NgAisFooterModule } from "../footer/footer.module";
import { NgAisHeaderModule } from "../header/header.module";
import { NgAisNumericRange } from "./numeric-range";

@NgModule({
  declarations: [NgAisNumericRange],
  entryComponents: [NgAisNumericRange],
  exports: [NgAisNumericRange],
  imports: [CommonModule, NgAisHeaderModule, NgAisFooterModule]
})
export class NgAisNumericRangeModule {}
