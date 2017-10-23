import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NgISFooterModule } from "../footer/footer.module";
import { NgISHeaderModule } from "../header/header.module";
import { NgISClearAll } from "./clear-all";

@NgModule({
  declarations: [NgISClearAll],
  entryComponents: [NgISClearAll],
  exports: [NgISClearAll],
  imports: [CommonModule, NgISHeaderModule, NgISFooterModule]
})
export class NgISClearAllModule {}
