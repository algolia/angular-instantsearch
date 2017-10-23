import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NgISFooterModule } from "../footer/footer.module";
import { NgISHeaderModule } from "../header/header.module";
import { NgISInfiniteHits } from "./infinite-hits";

@NgModule({
  declarations: [NgISInfiniteHits],
  entryComponents: [NgISInfiniteHits],
  exports: [NgISInfiniteHits],
  imports: [CommonModule, NgISHeaderModule, NgISFooterModule]
})
export class NgISInfiniteHitsModule {}
