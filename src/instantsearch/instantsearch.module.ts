import { CommonModule } from "@angular/common";
import { ModuleWithProviders, NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { NgAisInstantSearch } from "./instantsearch";

@NgModule({
  declarations: [NgAisInstantSearch],
  entryComponents: [NgAisInstantSearch],
  exports: [NgAisInstantSearch],
  imports: [CommonModule, HttpClientModule]
})
export class NgAisInstantSearchModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgAisInstantSearchModule,
      providers: []
    };
  }
}
