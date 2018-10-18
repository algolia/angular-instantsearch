import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgAisHighlightModule } from '../highlight/highlight.module';
import { NgAisInfiniteHits } from './infinite-hits';

@NgModule({
  declarations: [NgAisInfiniteHits],
  entryComponents: [NgAisInfiniteHits],
  exports: [NgAisInfiniteHits],
  imports: [CommonModule, NgAisHighlightModule],
})
export class NgAisInfiniteHitsModule {}
