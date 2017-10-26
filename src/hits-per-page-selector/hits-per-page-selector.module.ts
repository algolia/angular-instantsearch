import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NgAisFooterModule } from "../footer/footer.module";
import { NgAisHeaderModule } from "../header/header.module";
import { NgAisHitsPerPageSelector } from "./hits-per-page-selector";

@NgModule({
  declarations: [NgAisHitsPerPageSelector],
  entryComponents: [NgAisHitsPerPageSelector],
  exports: [NgAisHitsPerPageSelector],
  imports: [CommonModule, NgAisHeaderModule, NgAisFooterModule]
})
export class NgAisHitsPerPageSelectorModule {}
