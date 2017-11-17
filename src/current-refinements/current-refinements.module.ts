import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NgAisFooterModule } from "../footer/footer.module";
import { NgAisHeaderModule } from "../header/header.module";
import { NgAisCurrentRefinements } from "./current-refinements";

@NgModule({
  declarations: [NgAisCurrentRefinements],
  entryComponents: [NgAisCurrentRefinements],
  exports: [NgAisCurrentRefinements],
  imports: [CommonModule, NgAisHeaderModule, NgAisFooterModule]
})
export class NgAisCurrentRefinementsModule {}
