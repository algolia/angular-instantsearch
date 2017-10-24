import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NgISFooterModule } from "../footer/footer.module";
import { NgISHeaderModule } from "../header/header.module";
import { NgISHierarchicalMenu } from "./hierarchical-menu";
import { NgISHierarchicalMenuItem } from "./hierarchical-menu-item";

@NgModule({
  declarations: [NgISHierarchicalMenu, NgISHierarchicalMenuItem],
  entryComponents: [NgISHierarchicalMenu],
  exports: [NgISHierarchicalMenu],
  imports: [CommonModule, NgISHeaderModule, NgISFooterModule]
})
export class NgISHierarchicalMenuModule {}
