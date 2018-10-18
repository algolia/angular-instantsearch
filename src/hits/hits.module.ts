import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgAisHighlightModule } from '../highlight/highlight.module';
import { NgAisHits } from './hits';

@NgModule({
  declarations: [NgAisHits],
  entryComponents: [NgAisHits],
  exports: [NgAisHits],
  imports: [CommonModule, NgAisHighlightModule],
})
export class NgAisHitsModule {}
