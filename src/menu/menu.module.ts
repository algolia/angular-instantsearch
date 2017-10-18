import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NgISFooterModule } from "../footer/footer.module";
import { NgISHeaderModule } from "../header/header.module";

import { NgISMenu } from "./menu";

export { NgISMenu } from "./menu";

@NgModule({
  declarations: [NgISMenu],
  entryComponents: [NgISMenu],
  exports: [NgISMenu],
  imports: [CommonModule, NgISHeaderModule, NgISFooterModule]
})
export class NgISMenuModule {}
