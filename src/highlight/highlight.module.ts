import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NgAisHighlight } from "./highlight";

@NgModule({
  declarations: [NgAisHighlight],
  entryComponents: [NgAisHighlight],
  exports: [NgAisHighlight],
  imports: [CommonModule]
})
export class NgAisHighlightModule {}
