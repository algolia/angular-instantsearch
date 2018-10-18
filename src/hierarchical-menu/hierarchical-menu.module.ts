import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgAisHierarchicalMenu } from './hierarchical-menu';
import { NgAisHierarchicalMenuItem } from './hierarchical-menu-item';

@NgModule({
  declarations: [NgAisHierarchicalMenu, NgAisHierarchicalMenuItem],
  entryComponents: [NgAisHierarchicalMenu],
  exports: [NgAisHierarchicalMenu],
  imports: [CommonModule],
})
export class NgAisHierarchicalMenuModule {}
