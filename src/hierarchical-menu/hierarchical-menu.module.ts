import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NgAisFooterModule } from "../footer/footer.module";
import { NgAisHeaderModule } from "../header/header.module";
import { NgAisHierarchicalMenu } from "./hierarchical-menu";
import { NgAisHierarchicalMenuItem } from "./hierarchical-menu-item";

@NgModule({
  declarations: [NgAisHierarchicalMenu, NgAisHierarchicalMenuItem],
  entryComponents: [NgAisHierarchicalMenu],
  exports: [NgAisHierarchicalMenu],
  imports: [CommonModule, NgAisHeaderModule, NgAisFooterModule]
})
export class NgAisHierarchicalMenuModule {}
