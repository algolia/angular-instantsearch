import { ModuleWithProviders, NgModule } from '@angular/core';

// Modules
import { NgAisBreadcrumbModule } from './breadcrumb/breadcrumb.module';
export { NgAisBreadcrumbModule };
import { NgAisClearRefinementsModule } from './clear-refinements/clear-refinements.module';
export { NgAisClearRefinementsModule };
import { NgAisCurrentRefinementsModule } from './current-refinements/current-refinements.module';
export { NgAisCurrentRefinementsModule };
import { NgAisHierarchicalMenuModule } from './hierarchical-menu/hierarchical-menu.module';
export { NgAisHierarchicalMenuModule };
import { NgAisHitsPerPageModule } from './hits-per-page/hits-per-page.module';
export { NgAisHitsPerPageModule };
import { NgAisHitsModule } from './hits/hits.module';
export { NgAisHitsModule };
import { NgAisInfiniteHitsModule } from './infinite-hits/infinite-hits.module';
export { NgAisInfiniteHitsModule };
import { NgAisInstantSearchModule } from './instantsearch/instantsearch.module';
export { NgAisInstantSearchModule };
import { NgAisMenuModule } from './menu/menu.module';
export { NgAisMenuModule };
import { NgAisNumericMenuModule } from './numeric-menu/numeric-menu.module';
export { NgAisNumericMenuModule };
import { NgAisPaginationModule } from './pagination/pagination.module';
export { NgAisPaginationModule };
import { NgAisRangeSliderModule } from './range-slider/range-slider.module';
export { NgAisRangeSliderModule };
import { NgAisRefinementListModule } from './refinement-list/refinement-list.module';
export { NgAisRefinementListModule };
import { NgAisSearchBoxModule } from './search-box/search-box.module';
export { NgAisSearchBoxModule };
import { NgAisSortByModule } from './sort-by/sort-by.module';
export { NgAisSortByModule };
import { NgAisRatingMenuModule } from './rating-menu/rating-menu.module';
export { NgAisRatingMenuModule };
import { NgAisStatsModule } from './stats/stats.module';
export { NgAisStatsModule };
import { NgAisToggleModule } from './toggle/toggle.module';
export { NgAisToggleModule };
import { NgAisHighlightModule } from './highlight/highlight.module';
export { NgAisHighlightModule };
import { NgAisRangeInputModule } from './range-input/range-input.module';
export { NgAisRangeInputModule };
import { NgAisPanelModule } from './panel/panel.module';
export { NgAisPanelModule };
import { NgAisConfigureModule } from './configure/configure.module';
export { NgAisConfigureModule };

// Custom SSR algoliasearchClient
import {
  createSSRAlgoliaClient,
  createSSRSearchClient,
} from './create-ssr-algolia-client';
export { createSSRAlgoliaClient, createSSRSearchClient };

import { parseServerRequest } from './parse-server-request';
export { parseServerRequest };

// Custom widget with BaseWidget class
import { BaseWidget, Widget, Connector } from './base-widget';
export { BaseWidget, Widget, Connector };

import { NgAisInstantSearch } from './instantsearch/instantsearch';
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
  NgAisConfigureModule,
];

@NgModule({
  exports: NGIS_MODULES,
  imports: [NgAisInstantSearchModule.forRoot()],
})
export class NgAisRootModule {}

@NgModule({ imports: NGIS_MODULES, exports: NGIS_MODULES })
export class NgAisModule {
  public static forRoot(): ModuleWithProviders {
    return { ngModule: NgAisRootModule };
  }
}
