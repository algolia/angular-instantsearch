import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NgISFooterModule } from "../footer/footer.module";
import { NgISHeaderModule } from "../header/header.module";
import { NgISToggle } from "./toggle";

@NgModule({
  declarations: [NgISToggle],
  entryComponents: [NgISToggle],
  exports: [NgISToggle],
  imports: [CommonModule, NgISHeaderModule, NgISFooterModule]
})
export class NgISToggleModule {}
