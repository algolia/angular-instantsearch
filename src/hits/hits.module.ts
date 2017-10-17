import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NgISFooterModule } from "../footer/footer.module";
import { NgISHeaderModule } from "../header/header.module";

import { NgISHits } from "./hits";

export { NgISHits } from "./hits";

@NgModule({
  declarations: [NgISHits],
  entryComponents: [NgISHits],
  exports: [NgISHits],
  imports: [CommonModule, NgISHeaderModule, NgISFooterModule]
})
export class NgISHitsModule {}
