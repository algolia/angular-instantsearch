import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NgISFooterModule } from "../footer/footer.module";
import { NgISHeaderModule } from "../header/header.module";
import { NgISRangeSlider } from "./range-slider";

@NgModule({
  declarations: [NgISRangeSlider],
  entryComponents: [NgISRangeSlider],
  exports: [NgISRangeSlider],
  imports: [CommonModule, NgISHeaderModule, NgISFooterModule]
})
export class NgISRangeSliderModule {}
