import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NgISFooterModule } from "../footer/footer.module";
import { NgISHeaderModule } from "../header/header.module";
import { NgISStats } from "./stats";

@NgModule({
  declarations: [NgISStats],
  entryComponents: [NgISStats],
  exports: [NgISStats],
  imports: [CommonModule, NgISHeaderModule, NgISFooterModule]
})
export class NgISStatsModule {}
