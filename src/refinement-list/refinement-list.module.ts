import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NgISFooterModule } from "../footer/footer.module";
import { NgISHeaderModule } from "../header/header.module";
import { NgISRefinementList } from "./refinement-list";

@NgModule({
  declarations: [NgISRefinementList],
  entryComponents: [NgISRefinementList],
  exports: [NgISRefinementList],
  imports: [CommonModule, NgISHeaderModule, NgISFooterModule]
})
export class NgISRefinementListModule {}
