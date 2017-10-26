import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NgAisFooterModule } from "../footer/footer.module";
import { NgAisHeaderModule } from "../header/header.module";
import { NgAisSortBySelector } from "./sort-by-selector";

@NgModule({
  declarations: [NgAisSortBySelector],
  entryComponents: [NgAisSortBySelector],
  exports: [NgAisSortBySelector],
  imports: [CommonModule, NgAisHeaderModule, NgAisFooterModule]
})
export class NgAisSortBySelectorModule {}
