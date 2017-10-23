import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NgISFooterModule } from "../footer/footer.module";
import { NgISHeaderModule } from "../header/header.module";
import { NgISCurrentRefinedValues } from "./current-refined-values";

@NgModule({
  declarations: [NgISCurrentRefinedValues],
  entryComponents: [NgISCurrentRefinedValues],
  exports: [NgISCurrentRefinedValues],
  imports: [CommonModule, NgISHeaderModule, NgISFooterModule]
})
export class NgISCurrentRefinedValuesModule {}
