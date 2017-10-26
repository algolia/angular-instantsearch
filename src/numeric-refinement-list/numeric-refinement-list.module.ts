import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NgAisFooterModule } from "../footer/footer.module";
import { NgAisHeaderModule } from "../header/header.module";
import { NgAisNumericRefinementList } from "./numeric-refinement-list";

@NgModule({
  declarations: [NgAisNumericRefinementList],
  entryComponents: [NgAisNumericRefinementList],
  exports: [NgAisNumericRefinementList],
  imports: [CommonModule, NgAisHeaderModule, NgAisFooterModule]
})
export class NgAisNumericRefinementListModule {}
