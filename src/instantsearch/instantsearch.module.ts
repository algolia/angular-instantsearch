import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { NgAisInstantSearch } from './instantsearch';

@NgModule({
  declarations: [NgAisInstantSearch],
  entryComponents: [NgAisInstantSearch],
  exports: [NgAisInstantSearch],
  imports: [CommonModule],
})
export class NgAisInstantSearchModule {
  public static forRoot(): ModuleWithProviders<NgAisInstantSearchModule> {
    return {
      ngModule: NgAisInstantSearchModule,
      providers: [],
    };
  }
}
