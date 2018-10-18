import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgAisNumericMenu } from './numeric-menu';

@NgModule({
  declarations: [NgAisNumericMenu],
  entryComponents: [NgAisNumericMenu],
  exports: [NgAisNumericMenu],
  imports: [CommonModule],
})
export class NgAisNumericMenuModule {}
