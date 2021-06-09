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

import { NgAisIndexModule } from './index-widget/index-widget.module';

export { NgAisIndexModule };

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

import { NgAisConfigureRelatedItemsModule } from './configure-related-items/configure-related-items.module';

export { NgAisConfigureRelatedItemsModule };

import { NgAisQueryRuleCustomDataModule } from './query-rule-custom-data/query-rule-custom-data.module';

export { NgAisQueryRuleCustomDataModule };

import { NgAisQueryRuleContextModule } from './query-rule-context/query-rule-context.module';

export { NgAisQueryRuleContextModule };

import { NgAisVoiceSearchModule } from './voice-search/voice-search.module';

export { NgAisVoiceSearchModule };

// Server-side rendering
export { createSSRSearchClient } from './create-ssr-search-client';

// Custom widget with BaseWidget class
export { BaseWidget, Widget, Connector } from './base-widget';

const NGIS_MODULES = [
  NgAisInstantSearchModule,
  NgAisIndexModule,
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
  NgAisConfigureRelatedItemsModule,
  NgAisQueryRuleCustomDataModule,
  NgAisQueryRuleContextModule,
  NgAisVoiceSearchModule,
];

@NgModule({
  exports: NGIS_MODULES,
  imports: [NgAisInstantSearchModule.forRoot()],
})
export class NgAisRootModule {}

@NgModule({ imports: NGIS_MODULES, exports: NGIS_MODULES })
export class NgAisModule {
  public static forRoot(): ModuleWithProviders<NgAisRootModule> {
    return { ngModule: NgAisRootModule };
  }
}
