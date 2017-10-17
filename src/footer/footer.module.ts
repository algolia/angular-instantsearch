import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NgISFooter } from "./footer";
export { NgISFooter } from "./footer";

@NgModule({
  declarations: [NgISFooter],
  entryComponents: [NgISFooter],
  exports: [NgISFooter],
  imports: [CommonModule]
})
export class NgISFooterModule {}
