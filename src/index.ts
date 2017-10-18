/* tslint:disable:max-classes-per-file */

import { ModuleWithProviders, NgModule } from "@angular/core";

// Modules
import { NgISClearAllModule } from "./clear-all/clear-all.module";
import { NgISHitsModule } from "./hits/hits.module";
import { NgISInstantSearchModule } from "./instantsearch/instantsearch.module";
import { NgISSearchBoxModule } from "./search-box/search-box.module";

// Re-Export
export {
  NgISInstantSearchModule,
  NgISInstance,
  NgISInstantSearch
} from "./instantsearch/instantsearch.module";
export { NgISHits } from "./hits/hits.module";
export { NgISSearchBoxModule } from "./search-box/search-box.module";
export { NgISClearAllModule } from "./clear-all/clear-all.module";

const NGIS_MODULES = [
  NgISInstantSearchModule,
  NgISHitsModule,
  NgISSearchBoxModule,
  NgISClearAllModule
];

@NgModule({
  exports: NGIS_MODULES,
  imports: [NgISInstantSearchModule.forRoot()]
})
export class NgISRootModule {}

@NgModule({ imports: NGIS_MODULES, exports: NGIS_MODULES })
export class NgISModule {
  public static forRoot(): ModuleWithProviders {
    return { ngModule: NgISRootModule };
  }
}
