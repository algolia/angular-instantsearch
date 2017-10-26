import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NgAisFooterModule } from "../footer/footer.module";
import { NgAisHeaderModule } from "../header/header.module";
import { NgAisBreadcrumb } from "./breadcrumb";

@NgModule({
  declarations: [NgAisBreadcrumb],
  entryComponents: [NgAisBreadcrumb],
  exports: [NgAisBreadcrumb],
  imports: [CommonModule, NgAisHeaderModule, NgAisFooterModule]
})
export class NgAisBreadcrumbModule {}
