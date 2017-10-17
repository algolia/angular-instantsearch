import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NgISHits } from "./hits";
export { NgISHits } from "./hits";

@NgModule({
  declarations: [NgISHits],
  entryComponents: [NgISHits],
  exports: [NgISHits],
  imports: [CommonModule]
})
export class NgISHitsModule {}
