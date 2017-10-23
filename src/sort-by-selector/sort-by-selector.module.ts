import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NgISFooterModule } from "../footer/footer.module";
import { NgISHeaderModule } from "../header/header.module";
import { NgISSortBySelector } from "./sort-by-selector";

@NgModule({
  declarations: [NgISSortBySelector],
  entryComponents: [NgISSortBySelector],
  exports: [NgISSortBySelector],
  imports: [CommonModule, NgISHeaderModule, NgISFooterModule]
})
export class NgISSortBySelectorModule {}
