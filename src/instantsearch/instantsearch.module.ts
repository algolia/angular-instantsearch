import { CommonModule } from "@angular/common";
import { ModuleWithProviders, NgModule } from "@angular/core";

import { NgAisInstantSearch } from "./instantsearch";
import { NgAisInstance } from "./instantsearch-instance";

@NgModule({
  declarations: [NgAisInstantSearch],
  entryComponents: [NgAisInstantSearch],
  exports: [NgAisInstantSearch],
  imports: [CommonModule]
})
export class NgAisInstantSearchModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgAisInstantSearchModule,
      providers: [NgAisInstance]
    };
  }
}
