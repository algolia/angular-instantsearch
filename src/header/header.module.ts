import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NgISHeader } from "./header";
export { NgISHeader } from "./header";

@NgModule({
  declarations: [NgISHeader],
  entryComponents: [NgISHeader],
  exports: [NgISHeader],
  imports: [CommonModule]
})
export class NgISHeaderModule {}
