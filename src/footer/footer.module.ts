import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NgAisFooter } from "./footer";
export { NgAisFooter } from "./footer";

@NgModule({
  declarations: [NgAisFooter],
  entryComponents: [NgAisFooter],
  exports: [NgAisFooter],
  imports: [CommonModule]
})
export class NgAisFooterModule {}
