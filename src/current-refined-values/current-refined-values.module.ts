import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NgAisFooterModule } from "../footer/footer.module";
import { NgAisHeaderModule } from "../header/header.module";
import { NgAisCurrentRefinedValues } from "./current-refined-values";

@NgModule({
  declarations: [NgAisCurrentRefinedValues],
  entryComponents: [NgAisCurrentRefinedValues],
  exports: [NgAisCurrentRefinedValues],
  imports: [CommonModule, NgAisHeaderModule, NgAisFooterModule]
})
export class NgAisCurrentRefinedValuesModule {}
