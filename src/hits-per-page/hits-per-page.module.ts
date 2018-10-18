import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgAisHitsPerPage } from './hits-per-page';

@NgModule({
  declarations: [NgAisHitsPerPage],
  entryComponents: [NgAisHitsPerPage],
  exports: [NgAisHitsPerPage],
  imports: [CommonModule],
})
export class NgAisHitsPerPageModule {}
