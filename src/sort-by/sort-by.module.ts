import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NgAisFooterModule } from "../footer/footer.module";
import { NgAisHeaderModule } from "../header/header.module";
import { NgAisSortBy } from "./sort-by";

@NgModule({
  declarations: [NgAisSortBy],
  entryComponents: [NgAisSortBy],
  exports: [NgAisSortBy],
  imports: [CommonModule, NgAisHeaderModule, NgAisFooterModule]
})
export class NgAisSortByModule {}
