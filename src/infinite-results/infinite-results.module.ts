import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NgAisFooterModule } from "../footer/footer.module";
import { NgAisHeaderModule } from "../header/header.module";
import { NgAisHighlightModule } from "../highlight/highlight.module";
import { NgAisInfiniteResults } from "./infinite-results";

@NgModule({
  declarations: [NgAisInfiniteResults],
  entryComponents: [NgAisInfiniteResults],
  exports: [NgAisInfiniteResults],
  imports: [
    CommonModule,
    NgAisHeaderModule,
    NgAisFooterModule,
    NgAisHighlightModule
  ]
})
export class NgAisInfiniteResultsModule {}
