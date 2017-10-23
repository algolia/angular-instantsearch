import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NgISFooterModule } from "../footer/footer.module";
import { NgISHeaderModule } from "../header/header.module";
import { NgISHitsPerPageSelector } from "./hits-per-page-selector";

@NgModule({
  declarations: [NgISHitsPerPageSelector],
  entryComponents: [NgISHitsPerPageSelector],
  exports: [NgISHitsPerPageSelector],
  imports: [CommonModule, NgISHeaderModule, NgISFooterModule]
})
export class NgISHitsPerPageSelectorModule {}
