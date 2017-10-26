import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NgAisFooterModule } from "../footer/footer.module";
import { NgAisHeaderModule } from "../header/header.module";
import { NgAisMenu } from "./menu";

@NgModule({
  declarations: [NgAisMenu],
  entryComponents: [NgAisMenu],
  exports: [NgAisMenu],
  imports: [CommonModule, NgAisHeaderModule, NgAisFooterModule]
})
export class NgAisMenuModule {}
