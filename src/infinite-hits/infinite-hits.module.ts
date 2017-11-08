import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NgAisFooterModule } from "../footer/footer.module";
import { NgAisHeaderModule } from "../header/header.module";
import { NgAisHighlightModule } from "../highlight/highlight.module";
import { NgAisInfiniteHits } from "./infinite-hits";

@NgModule({
  declarations: [NgAisInfiniteHits],
  entryComponents: [NgAisInfiniteHits],
  exports: [NgAisInfiniteHits],
  imports: [
    CommonModule,
    NgAisHeaderModule,
    NgAisFooterModule,
    NgAisHighlightModule
  ]
})
export class NgAisInfiniteHitsModule {}
