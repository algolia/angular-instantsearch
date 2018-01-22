import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NgAisPanel } from "./panel";
export { NgAisPanel } from "./panel";

@NgModule({
  declarations: [NgAisPanel],
  entryComponents: [NgAisPanel],
  exports: [NgAisPanel],
  imports: [CommonModule]
})
export class NgAisPanelModule {}
