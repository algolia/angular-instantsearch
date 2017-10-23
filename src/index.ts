/* tslint:disable:max-classes-per-file */

import { ModuleWithProviders, NgModule } from "@angular/core";

// Modules
import { NgISClearAllModule } from "./clear-all/clear-all.module";
import { NgISCurrentRefinedValuesModule } from "./current-refined-values/current-refined-values.module";
import { NgISHitsPerPageSelectorModule } from "./hits-per-page-selector/hits-per-page-selector.module";
import { NgISHitsModule } from "./hits/hits.module";
import { NgISInfiniteHitsModule } from "./infinite-hits/infinite-hits.module";
import { NgISInstantSearchModule } from "./instantsearch/instantsearch.module";
import { NgISMenuModule } from "./menu/menu.module";
import { NgISNumericRefinementListModule } from "./numeric-refinement-list/numeric-refinement-list.module";
import { NgISNumericSelectorModule } from "./numeric-selector/numeric-selector.module";
import { NgISPaginationModule } from "./pagination/pagination.module";
import { NgISPriceRangesModule } from "./price-ranges/price-ranges.module";
import { NgISRefinementListModule } from "./refinement-list/refinement-list.module";
import { NgISSearchBoxModule } from "./search-box/search-box.module";
import { NgISSortBySelectorModule } from "./sort-by-selector/sort-by-selector.module";
import { NgISStatsModule } from "./stats/stats.module";
import { NgISToggleModule } from "./toggle/toggle.module";

const NGIS_MODULES = [
  NgISInstantSearchModule,
  NgISHitsModule,
  NgISSearchBoxModule,
  NgISClearAllModule,
  NgISMenuModule,
  NgISPaginationModule,
  NgISRefinementListModule,
  NgISHitsPerPageSelectorModule,
  NgISSortBySelectorModule,
  NgISNumericSelectorModule,
  NgISNumericRefinementListModule,
  NgISStatsModule,
  NgISToggleModule,
  NgISInfiniteHitsModule,
  NgISCurrentRefinedValuesModule,
  NgISPriceRangesModule
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
