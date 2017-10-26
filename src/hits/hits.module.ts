import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NgAisFooterModule } from "../footer/footer.module";
import { NgAisHeaderModule } from "../header/header.module";
import { NgAisHits } from "./hits";

@NgModule({
  declarations: [NgAisHits],
  entryComponents: [NgAisHits],
  exports: [NgAisHits],
  imports: [CommonModule, NgAisHeaderModule, NgAisFooterModule]
})
export class NgAisHitsModule {}
