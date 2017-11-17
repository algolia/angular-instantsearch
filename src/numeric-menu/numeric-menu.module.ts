import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NgAisFooterModule } from "../footer/footer.module";
import { NgAisHeaderModule } from "../header/header.module";
import { NgAisNumericMenu } from "./numeric-menu";

@NgModule({
  declarations: [NgAisNumericMenu],
  entryComponents: [NgAisNumericMenu],
  exports: [NgAisNumericMenu],
  imports: [CommonModule, NgAisHeaderModule, NgAisFooterModule]
})
export class NgAisNumericMenuModule {}
