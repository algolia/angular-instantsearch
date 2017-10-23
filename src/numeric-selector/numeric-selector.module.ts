import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NgISFooterModule } from "../footer/footer.module";
import { NgISHeaderModule } from "../header/header.module";
import { NgISNumericSelector } from "./numeric-selector";

@NgModule({
  declarations: [NgISNumericSelector],
  entryComponents: [NgISNumericSelector],
  exports: [NgISNumericSelector],
  imports: [CommonModule, NgISHeaderModule, NgISFooterModule]
})
export class NgISNumericSelectorModule {}
