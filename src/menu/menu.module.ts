import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgAisMenu } from './menu';

@NgModule({
  declarations: [NgAisMenu],
  entryComponents: [NgAisMenu],
  exports: [NgAisMenu],
  imports: [CommonModule],
})
export class NgAisMenuModule {}
