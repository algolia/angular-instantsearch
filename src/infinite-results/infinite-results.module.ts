import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NgAisHighlightModule } from "../highlight/highlight.module";
import { NgAisInfiniteResults } from "./infinite-results";

@NgModule({
  declarations: [NgAisInfiniteResults],
  entryComponents: [NgAisInfiniteResults],
  exports: [NgAisInfiniteResults],
  imports: [CommonModule, NgAisHighlightModule]
})
export class NgAisInfiniteResultsModule {}
