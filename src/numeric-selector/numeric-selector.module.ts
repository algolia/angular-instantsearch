import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NgAisFooterModule } from "../footer/footer.module";
import { NgAisHeaderModule } from "../header/header.module";
import { NgAisNumericSelector } from "./numeric-selector";

@NgModule({
  declarations: [NgAisNumericSelector],
  entryComponents: [NgAisNumericSelector],
  exports: [NgAisNumericSelector],
  imports: [CommonModule, NgAisHeaderModule, NgAisFooterModule]
})
export class NgAisNumericSelectorModule {}
