import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NgAisFooterModule } from "../footer/footer.module";
import { NgAisHeaderModule } from "../header/header.module";
import { NgAisPagination } from "./pagination";

@NgModule({
  declarations: [NgAisPagination],
  entryComponents: [NgAisPagination],
  exports: [NgAisPagination],
  imports: [CommonModule, NgAisHeaderModule, NgAisFooterModule]
})
export class NgAisPaginationModule {}
