import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NgAisFooterModule } from "../footer/footer.module";
import { NgAisHeaderModule } from "../header/header.module";
import { NgAisClearRefinements } from "./clear-refinements";

@NgModule({
  declarations: [NgAisClearRefinements],
  entryComponents: [NgAisClearRefinements],
  exports: [NgAisClearRefinements],
  imports: [CommonModule, NgAisHeaderModule, NgAisFooterModule]
})
export class NgAisClearRefinementsModule {}
