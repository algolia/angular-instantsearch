import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgAisHighlightModule } from '../highlight/highlight.module';
import { NgAisRefinementList } from './refinement-list';
import { NgAisFacetsSearch } from './facets-search';

@NgModule({
  declarations: [NgAisRefinementList, NgAisFacetsSearch],
  entryComponents: [NgAisRefinementList],
  exports: [NgAisRefinementList],
  imports: [CommonModule, NgAisHighlightModule],
})
export class NgAisRefinementListModule {}
