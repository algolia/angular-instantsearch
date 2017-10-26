import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NgAisHeader } from "./header";
export { NgAisHeader } from "./header";

@NgModule({
  declarations: [NgAisHeader],
  entryComponents: [NgAisHeader],
  exports: [NgAisHeader],
  imports: [CommonModule]
})
export class NgAisHeaderModule {}
