import { CommonModule } from "@angular/common";
import { ModuleWithProviders, NgModule } from "@angular/core";

import { NgISInstantSearch } from "./instantsearch";
import { NgISInstance } from "./instantsearch-instance";

@NgModule({
  declarations: [NgISInstantSearch],
  entryComponents: [NgISInstantSearch],
  exports: [NgISInstantSearch],
  imports: [CommonModule]
})
export class NgISInstantSearchModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgISInstantSearchModule,
      providers: [NgISInstance]
    };
  }
}
