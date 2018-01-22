import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NgAisClearRefinements } from "./clear-refinements";

@NgModule({
  declarations: [NgAisClearRefinements],
  entryComponents: [NgAisClearRefinements],
  exports: [NgAisClearRefinements],
  imports: [CommonModule]
})
export class NgAisClearRefinementsModule {}
