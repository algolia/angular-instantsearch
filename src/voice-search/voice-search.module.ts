import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgAisVoiceSearch } from './voice-search';

@NgModule({
  declarations: [NgAisVoiceSearch],
  entryComponents: [NgAisVoiceSearch],
  exports: [NgAisVoiceSearch],
  imports: [CommonModule],
})
export class NgAisVoiceSearchModule {}
