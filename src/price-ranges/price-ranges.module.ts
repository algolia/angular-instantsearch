import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NgISFooterModule } from "../footer/footer.module";
import { NgISHeaderModule } from "../header/header.module";
import { NgISPriceRanges } from "./price-ranges";

@NgModule({
  declarations: [NgISPriceRanges],
  entryComponents: [NgISPriceRanges],
  exports: [NgISPriceRanges],
  imports: [CommonModule, NgISHeaderModule, NgISFooterModule]
})
export class NgISPriceRangesModule {}
