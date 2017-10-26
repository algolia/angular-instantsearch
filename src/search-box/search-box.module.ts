import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NgAisFooterModule } from "../footer/footer.module";
import { NgAisHeaderModule } from "../header/header.module";
import { NgAisSearchBox } from "./search-box";

@NgModule({
  declarations: [NgAisSearchBox],
  entryComponents: [NgAisSearchBox],
  exports: [NgAisSearchBox],
  imports: [CommonModule, NgAisHeaderModule, NgAisFooterModule]
})
export class NgAisSearchBoxModule {}
