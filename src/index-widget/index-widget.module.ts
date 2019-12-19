import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { NgAisIndex } from './index-widget';

@NgModule({
  declarations: [NgAisIndex],
  entryComponents: [NgAisIndex],
  exports: [NgAisIndex],
  imports: [CommonModule],
})
export class NgAisIndexModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgAisIndexModule,
      providers: [],
    };
  }
}
