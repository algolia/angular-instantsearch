import { ModuleWithProviders, NgModule } from "@angular/core";

// Modules
import { NgAisBreadcrumbModule } from "./breadcrumb/breadcrumb.module";
import { NgAisClearRefinementsModule } from "./clear-refinements/clear-refinements.module";
import { NgAisCurrentRefinementsModule } from "./current-refinements/current-refinements.module";
import { NgAisHierarchicalMenuModule } from "./hierarchical-menu/hierarchical-menu.module";
import { NgAisHitsPerPageModule } from "./hits-per-page/hits-per-page.module";
import { NgAisHitsModule } from "./hits/hits.module";
import { NgAisInfiniteHitsModule } from "./infinite-hits/infinite-hits.module";
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
import { NgAisRangeInputModule } from "./range-input/range-input.module";
import { NgAisPanelModule } from "./panel/panel.module";
import { NgAisConfigureModule } from "./configure/configure.module";

// Custom SSR algoliasearchClient
import {
  createSSRAlgoliaClient,
  createSSRSearchClient,
} from "./create-ssr-algolia-client";
export { createSSRAlgoliaClient, createSSRSearchClient };

import { parseServerRequest } from "./parse-server-request";
export { parseServerRequest };

// Custom widget with BaseWidget class
import { BaseWidget } from "./base-widget";
export { BaseWidget };

import { NgAisInstantSearch } from "./instantsearch/instantsearch";
export { NgAisInstantSearch };

const NGIS_MODULES = [
  NgAisInstantSearchModule,
  NgAisHitsModule,
  NgAisSearchBoxModule,
  NgAisClearRefinementsModule,
  NgAisMenuModule,
  NgAisPaginationModule,
  NgAisRefinementListModule,
  NgAisHitsPerPageModule,
  NgAisSortByModule,
  NgAisNumericSelectorModule,
  NgAisNumericMenuModule,
  NgAisStatsModule,
  NgAisToggleModule,
  NgAisInfiniteHitsModule,
  NgAisCurrentRefinementsModule,
  NgAisHierarchicalMenuModule,
  NgAisRatingMenuModule,
  NgAisRangeSliderModule,
  NgAisBreadcrumbModule,
  NgAisHighlightModule,
  NgAisRangeInputModule,
  NgAisPanelModule,
  NgAisConfigureModule
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
