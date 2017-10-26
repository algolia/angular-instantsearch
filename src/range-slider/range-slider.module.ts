import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NgAisFooterModule } from "../footer/footer.module";
import { NgAisHeaderModule } from "../header/header.module";
import { NgAisRangeSlider } from "./range-slider";

@NgModule({
  declarations: [NgAisRangeSlider],
  entryComponents: [NgAisRangeSlider],
  exports: [NgAisRangeSlider],
  imports: [CommonModule, NgAisHeaderModule, NgAisFooterModule]
})
export class NgAisRangeSliderModule {}
