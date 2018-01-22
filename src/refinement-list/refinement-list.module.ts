import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NgAisHighlightModule } from "../highlight/highlight.module";
import { NgAisRefinementList } from "./refinement-list";

@NgModule({
  declarations: [NgAisRefinementList],
  entryComponents: [NgAisRefinementList],
  exports: [NgAisRefinementList],
  imports: [CommonModule, NgAisHighlightModule]
})
export class NgAisRefinementListModule {}
