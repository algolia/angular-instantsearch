import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NgAisRangeInput } from "./range-input";

@NgModule({
  declarations: [NgAisRangeInput],
  entryComponents: [NgAisRangeInput],
  exports: [NgAisRangeInput],
  imports: [CommonModule]
})
export class NgAisRangeInputModule {}
