import { ModuleWithProviders, NgModule } from '@angular/core';

// Modules
import { NgAisBreadcrumbModule } from './breadcrumb/breadcrumb.module';
import { NgAisBreadcrumb } from './breadcrumb/breadcrumb';
export { NgAisBreadcrumbModule, NgAisBreadcrumb };

import { NgAisClearRefinementsModule } from './clear-refinements/clear-refinements.module';
import { NgAisClearRefinements } from './clear-refinements/clear-refinements';
export { NgAisClearRefinementsModule, NgAisClearRefinements };

import { NgAisCurrentRefinementsModule } from './current-refinements/current-refinements.module';
import { NgAisCurrentRefinements } from './current-refinements/current-refinements';
export { NgAisCurrentRefinementsModule, NgAisCurrentRefinements };

import { NgAisHierarchicalMenuModule } from './hierarchical-menu/hierarchical-menu.module';
import { NgAisHierarchicalMenu } from './hierarchical-menu/hierarchical-menu';
import { NgAisHierarchicalMenuItem } from './hierarchical-menu/hierarchical-menu-item';
export {
  NgAisHierarchicalMenuModule,
  NgAisHierarchicalMenu,
  NgAisHierarchicalMenuItem,
};

import { NgAisHitsPerPageModule } from './hits-per-page/hits-per-page.module';
import { NgAisHitsPerPage } from './hits-per-page/hits-per-page';
export { NgAisHitsPerPageModule, NgAisHitsPerPage };

import { NgAisHitsModule } from './hits/hits.module';
import { NgAisHits } from './hits/hits';
export { NgAisHitsModule, NgAisHits };

import { NgAisIndexModule } from './index-widget/index-widget.module';
import { NgAisIndex } from './index-widget/index-widget';
export { NgAisIndexModule, NgAisIndex };

import { NgAisInfiniteHitsModule } from './infinite-hits/infinite-hits.module';
import { NgAisInfiniteHits } from './infinite-hits/infinite-hits';
export { NgAisInfiniteHitsModule, NgAisInfiniteHits };

import { NgAisInstantSearchModule } from './instantsearch/instantsearch.module';
import { NgAisInstantSearch } from './instantsearch/instantsearch';
export { NgAisInstantSearchModule, NgAisInstantSearch };

import { NgAisMenuModule } from './menu/menu.module';
import { NgAisMenu } from './menu/menu';
export { NgAisMenuModule, NgAisMenu };

import { NgAisNumericMenuModule } from './numeric-menu/numeric-menu.module';
import { NgAisNumericMenu } from './numeric-menu/numeric-menu';
export { NgAisNumericMenuModule, NgAisNumericMenu };

import { NgAisPaginationModule } from './pagination/pagination.module';
import { NgAisPagination } from './pagination/pagination';
export { NgAisPaginationModule, NgAisPagination };

import { NgAisRangeSliderModule } from './range-slider/range-slider.module';
import { NgAisRangeSlider } from './range-slider/range-slider';
export { NgAisRangeSliderModule, NgAisRangeSlider };

import { NgAisRefinementListModule } from './refinement-list/refinement-list.module';
import { NgAisRefinementList } from './refinement-list/refinement-list';
export { NgAisRefinementListModule, NgAisRefinementList };

import { NgAisSearchBoxModule } from './search-box/search-box.module';
import { NgAisSearchBox } from './search-box/search-box';
export { NgAisSearchBoxModule, NgAisSearchBox };

import { NgAisSortByModule } from './sort-by/sort-by.module';
import { NgAisSortBy } from './sort-by/sort-by';
export { NgAisSortByModule, NgAisSortBy };

import { NgAisRatingMenuModule } from './rating-menu/rating-menu.module';
import { NgAisRatingMenu } from './rating-menu/rating-menu';
export { NgAisRatingMenuModule, NgAisRatingMenu };

import { NgAisStatsModule } from './stats/stats.module';
import { NgAisStats } from './stats/stats';
export { NgAisStatsModule, NgAisStats };

import { NgAisToggleModule } from './toggle/toggle.module';
import { NgAisToggle } from './toggle/toggle';
export { NgAisToggleModule, NgAisToggle };

import { NgAisHighlightModule } from './highlight/highlight.module';
import { NgAisHighlight } from './highlight/highlight';
export { NgAisHighlightModule, NgAisHighlight };

import { NgAisRangeInputModule } from './range-input/range-input.module';
import { NgAisRangeInput } from './range-input/range-input';
export { NgAisRangeInputModule, NgAisRangeInput };

import { NgAisPanelModule } from './panel/panel.module';
import { NgAisPanel } from './panel/panel';
export { NgAisPanelModule, NgAisPanel };

import { NgAisConfigureModule } from './configure/configure.module';
import { NgAisConfigure } from './configure/configure';
export { NgAisConfigureModule, NgAisConfigure };

import { NgAisConfigureRelatedItemsModule } from './configure-related-items/configure-related-items.module';
import { NgAisConfigureRelatedItems } from './configure-related-items/configure-related-items';
export { NgAisConfigureRelatedItemsModule, NgAisConfigureRelatedItems };

import { NgAisQueryRuleCustomDataModule } from './query-rule-custom-data/query-rule-custom-data.module';
import { NgAisQueryRuleCustomData } from './query-rule-custom-data/query-rule-custom-data';
export { NgAisQueryRuleCustomDataModule, NgAisQueryRuleCustomData };

import { NgAisQueryRuleContextModule } from './query-rule-context/query-rule-context.module';
import { NgAisQueryRuleContext } from './query-rule-context/query-rule-context';
export { NgAisQueryRuleContextModule, NgAisQueryRuleContext };

import { NgAisVoiceSearchModule } from './voice-search/voice-search.module';
import { NgAisVoiceSearch } from './voice-search/voice-search';
export { NgAisVoiceSearchModule, NgAisVoiceSearch };

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
