import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NgAisFooterModule } from "../footer/footer.module";
import { NgAisHeaderModule } from "../header/header.module";
import { NgAisStats } from "./stats";

@NgModule({
  declarations: [NgAisStats],
  entryComponents: [NgAisStats],
  exports: [NgAisStats],
  imports: [CommonModule, NgAisHeaderModule, NgAisFooterModule]
})
export class NgAisStatsModule {}
