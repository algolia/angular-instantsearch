import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgAisRatingMenu } from './rating-menu';

@NgModule({
  declarations: [NgAisRatingMenu],
  entryComponents: [NgAisRatingMenu],
  exports: [NgAisRatingMenu],
  imports: [CommonModule],
})
export class NgAisRatingMenuModule {}
