import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NgAisFooterModule } from "../footer/footer.module";
import { NgAisHeaderModule } from "../header/header.module";
import { NgAisToggle } from "./toggle";

@NgModule({
  declarations: [NgAisToggle],
  entryComponents: [NgAisToggle],
  exports: [NgAisToggle],
  imports: [CommonModule, NgAisHeaderModule, NgAisFooterModule]
})
export class NgAisToggleModule {}
