import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NgISFooterModule } from "../footer/footer.module";
import { NgISHeaderModule } from "../header/header.module";

import { NgISPagination } from "./pagination";

export { NgISPagination } from "./pagination";

@NgModule({
  declarations: [NgISPagination],
  entryComponents: [NgISPagination],
  exports: [NgISPagination],
  imports: [CommonModule, NgISHeaderModule, NgISFooterModule]
})
export class NgISPaginationModule {}
