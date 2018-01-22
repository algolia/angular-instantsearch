import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NgAisHighlightModule } from "../highlight/highlight.module";
import { NgAisResults } from "./results";

@NgModule({
  declarations: [NgAisResults],
  entryComponents: [NgAisResults],
  exports: [NgAisResults],
  imports: [CommonModule, NgAisHighlightModule]
})
export class NgAisResultsModule {}
