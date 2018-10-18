import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgAisStats } from './stats';

@NgModule({
  declarations: [NgAisStats],
  entryComponents: [NgAisStats],
  exports: [NgAisStats],
  imports: [CommonModule],
})
export class NgAisStatsModule {}
