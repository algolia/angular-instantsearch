import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NgISFooterModule } from "../footer/footer.module";
import { NgISHeaderModule } from "../header/header.module";
import { NgISBreadcrumb } from "./breadcrumb";

@NgModule({
  declarations: [NgISBreadcrumb],
  entryComponents: [NgISBreadcrumb],
  exports: [NgISBreadcrumb],
  imports: [CommonModule, NgISHeaderModule, NgISFooterModule]
})
export class NgISBreadcrumbModule {}
