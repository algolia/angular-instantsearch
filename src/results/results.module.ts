import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NgAisFooterModule } from "../footer/footer.module";
import { NgAisHeaderModule } from "../header/header.module";
import { NgAisHighlightModule } from "../highlight/highlight.module";
import { NgAisResults } from "./results";

@NgModule({
  declarations: [NgAisResults],
  entryComponents: [NgAisResults],
  exports: [NgAisResults],
  imports: [
    CommonModule,
    NgAisHeaderModule,
    NgAisFooterModule,
    NgAisHighlightModule
  ]
})
export class NgAisResultsModule {}
