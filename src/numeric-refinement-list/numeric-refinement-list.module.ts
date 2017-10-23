import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NgISFooterModule } from "../footer/footer.module";
import { NgISHeaderModule } from "../header/header.module";
import { NgISNumericRefinementList } from "./numeric-refinement-list";

@NgModule({
  declarations: [NgISNumericRefinementList],
  entryComponents: [NgISNumericRefinementList],
  exports: [NgISNumericRefinementList],
  imports: [CommonModule, NgISHeaderModule, NgISFooterModule]
})
export class NgISNumericRefinementListModule {}
