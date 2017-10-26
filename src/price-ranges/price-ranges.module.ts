import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NgAisFooterModule } from "../footer/footer.module";
import { NgAisHeaderModule } from "../header/header.module";
import { NgAisPriceRanges } from "./price-ranges";

@NgModule({
  declarations: [NgAisPriceRanges],
  entryComponents: [NgAisPriceRanges],
  exports: [NgAisPriceRanges],
  imports: [CommonModule, NgAisHeaderModule, NgAisFooterModule]
})
export class NgAisPriceRangesModule {}
