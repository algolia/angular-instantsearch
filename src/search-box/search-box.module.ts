import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NgISFooterModule } from "../footer/footer.module";
import { NgISHeaderModule } from "../header/header.module";

import { NgISSearchBox } from "./search-box";

export { NgISSearchBox } from "./search-box";

@NgModule({
  declarations: [NgISSearchBox],
  entryComponents: [NgISSearchBox],
  exports: [NgISSearchBox],
  imports: [CommonModule, NgISHeaderModule, NgISFooterModule]
})
export class NgISSearchBoxModule {}
