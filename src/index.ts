import { ModuleWithProviders, NgModule } from "@angular/core";

// Modules
import { NgAisBreadcrumbModule } from "./breadcrumb/breadcrumb.module";
import { NgAisClearRefinementsModule } from "./clear-refinements/clear-refinements.module";
import { NgAisCurrentRefinementsModule } from "./current-refinements/current-refinements.module";
import { NgAisHierarchicalMenuModule } from "./hierarchical-menu/hierarchical-menu.module";
import { NgAisResultsPerPageModule } from "./results-per-page/results-per-page.module";
import { NgAisResultsModule } from "./results/results.module";
import { NgAisInfiniteResultsModule } from "./infinite-results/infinite-results.module";
import { NgAisInstantSearchModule } from "./instantsearch/instantsearch.module";
import { NgAisMenuModule } from "./menu/menu.module";
import { NgAisNumericMenuModule } from "./numeric-menu/numeric-menu.module";
import { NgAisNumericSelectorModule } from "./numeric-selector/numeric-selector.module";
import { NgAisPaginationModule } from "./pagination/pagination.module";
import { NgAisRangeSliderModule } from "./range-slider/range-slider.module";
import { NgAisRefinementListModule } from "./refinement-list/refinement-list.module";
import { NgAisSearchBoxModule } from "./search-box/search-box.module";
import { NgAisSortByModule } from "./sort-by/sort-by.module";
import { NgAisRatingMenuModule } from "./rating-menu/rating-menu.module";
import { NgAisStatsModule } from "./stats/stats.module";
import { NgAisToggleModule } from "./toggle/toggle.module";
import { NgAisHighlightModule } from "./highlight/highlight.module";
import { NgAisNumericRangeModule } from "./numeric-range/numeric-range.module";
import { NgAisPanelModule } from "./panel/panel.module";

// Custom SSR algoliasearchClient
import { createSSRAlgoliaClient } from "./create-ssr-algolia-client";
export { createSSRAlgoliaClient };

import { parseServerRequest } from "./parse-server-request";
export { parseServerRequest };

// Custom widget with BaseWidget class
import { BaseWidget } from "./base-widget";
export { BaseWidget };

import { NgAisInstance } from "./instantsearch/instantsearch-instance";
export { NgAisInstance };

const NGIS_MODULES = [
  NgAisInstantSearchModule,
  NgAisResultsModule,
  NgAisSearchBoxModule,
  NgAisClearRefinementsModule,
  NgAisMenuModule,
  NgAisPaginationModule,
  NgAisRefinementListModule,
  NgAisResultsPerPageModule,
  NgAisSortByModule,
  NgAisNumericSelectorModule,
  NgAisNumericMenuModule,
  NgAisStatsModule,
  NgAisToggleModule,
  NgAisInfiniteResultsModule,
  NgAisCurrentRefinementsModule,
  NgAisHierarchicalMenuModule,
  NgAisRatingMenuModule,
  NgAisRangeSliderModule,
  NgAisBreadcrumbModule,
  NgAisHighlightModule,
  NgAisNumericRangeModule,
  NgAisPanelModule
];

@NgModule({
  exports: NGIS_MODULES,
  imports: [NgAisInstantSearchModule.forRoot()]
})
export class NgAisRootModule {}

@NgModule({ imports: NGIS_MODULES, exports: NGIS_MODULES })
export class NgAisModule {
  public static forRoot(): ModuleWithProviders {
    return { ngModule: NgAisRootModule };
  }
}
