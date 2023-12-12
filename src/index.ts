import { ModuleWithProviders, NgModule } from '@angular/core';

// Modules
// import { NgAisBreadcrumbModule } from './breadcrumb/breadcrumb.module';
// export { NgAisBreadcrumbModule };
export { NgAisBreadcrumb } from './breadcrumb/breadcrumb';

// import { NgAisClearRefinementsModule } from './clear-refinements/clear-refinements.module';
// export { NgAisClearRefinementsModule };
export { NgAisClearRefinements } from './clear-refinements/clear-refinements';

// import { NgAisCurrentRefinementsModule } from './current-refinements/current-refinements.module';
// export { NgAisCurrentRefinementsModule };
export { NgAisCurrentRefinements } from './current-refinements/current-refinements';

// import { NgAisHierarchicalMenuModule } from './hierarchical-menu/hierarchical-menu.module';
// export { NgAisHierarchicalMenuModule };
export { NgAisHierarchicalMenu } from './hierarchical-menu/hierarchical-menu';

// import { NgAisHitsPerPageModule } from './hits-per-page/hits-per-page.module';
// export { NgAisHitsPerPageModule };
export { NgAisHitsPerPage } from './hits-per-page/hits-per-page';

// import { NgAisHitsModule } from './hits/hits.module';
// export { NgAisHitsModule };
export { NgAisHits } from './hits/hits';

// import { NgAisIndexModule } from './index-widget/index-widget.module';
// export { NgAisIndexModule };
export { NgAisIndex } from './index-widget/index-widget';

// import { NgAisInfiniteHitsModule } from './infinite-hits/infinite-hits.module';
// export { NgAisInfiniteHitsModule };
export { NgAisInfiniteHits } from './infinite-hits/infinite-hits';

// export { NgAisInstantSearchModule };
import { NgAisInstantSearchModule } from './instantsearch/instantsearch.module';
export { NgAisInstantSearch } from './instantsearch/instantsearch';

// import { NgAisMenuModule } from './menu/menu.module';
// export { NgAisMenuModule };
export { NgAisMenu } from './menu/menu';

// import { NgAisNumericMenuModule } from './numeric-menu/numeric-menu.module';
// export { NgAisNumericMenuModule };
export { NgAisNumericMenu } from './numeric-menu/numeric-menu';

// import { NgAisPaginationModule } from './pagination/pagination.module';
// export { NgAisPaginationModule };
export { NgAisPagination } from './pagination/pagination';

// import { NgAisRangeSliderModule } from './range-slider/range-slider.module';
// export { NgAisRangeSliderModule };
export { NgAisRangeSlider } from './range-slider/range-slider';

// import { NgAisRefinementListModule } from './refinement-list/refinement-list.module';
// export { NgAisRefinementListModule };
export { NgAisRefinementList } from './refinement-list/refinement-list';

// import { NgAisSearchBoxModule } from './search-box/search-box.module';
// export { NgAisSearchBoxModule };
export { NgAisSearchBox } from './search-box/search-box';

// import { NgAisSortByModule } from './sort-by/sort-by.module';
// export { NgAisSortByModule };
export { NgAisSortBy } from './sort-by/sort-by';

// import { NgAisRatingMenuModule } from './rating-menu/rating-menu.module';
// export { NgAisRatingMenuModule };
export { NgAisRatingMenu } from './rating-menu/rating-menu';

// import { NgAisStatsModule } from './stats/stats.module';
// export { NgAisStatsModule };
export { NgAisStats } from './stats/stats';

// import { NgAisToggleModule } from './toggle/toggle.module';
// export { NgAisToggleModule };
export { NgAisToggle } from './toggle/toggle';

// import { NgAisHighlightModule } from './highlight/highlight.module';
// export { NgAisHighlightModule };
export { NgAisHighlight } from './highlight/highlight';

// import { NgAisReverseHighlightModule } from './reverse-highlight/reverse-highlight.module';
// export { NgAisReverseHighlightModule };
export { NgAisReverseHighlight } from './reverse-highlight/reverse-highlight';

// import { NgAisSnippetModule } from './snippet/snippet.module';
// export { NgAisSnippetModule };
export { NgAisSnippet } from './snippet/snippet';

// import { NgAisReverseSnippetModule } from './reverse-snippet/reverse-snippet.module';
// export { NgAisReverseSnippetModule };
export { NgAisReverseSnippet } from './reverse-snippet/reverse-snippet';

// import { NgAisRangeInputModule } from './range-input/range-input.module';
// export { NgAisRangeInputModule };
export { NgAisRangeInput } from './range-input/range-input';

// import { NgAisPanelModule } from './panel/panel.module';
// export { NgAisPanelModule };
export { NgAisPanel } from './panel/panel';

// import { NgAisConfigureModule } from './configure/configure.module';
// export { NgAisConfigureModule };
export { NgAisConfigure } from './configure/configure';

// import { NgAisConfigureRelatedItemsModule } from './configure-related-items/configure-related-items.module';
// export { NgAisConfigureRelatedItemsModule };
export { NgAisConfigureRelatedItems } from './configure-related-items/configure-related-items';

// import { NgAisQueryRuleCustomDataModule } from './query-rule-custom-data/query-rule-custom-data.module';
// export { NgAisQueryRuleCustomDataModule };
export { NgAisQueryRuleCustomData } from './query-rule-custom-data/query-rule-custom-data';

// import { NgAisQueryRuleContextModule } from './query-rule-context/query-rule-context.module';
// export { NgAisQueryRuleContextModule };
export { NgAisQueryRuleContext } from './query-rule-context/query-rule-context';

// import { NgAisVoiceSearchModule } from './voice-search/voice-search.module';
// export { NgAisVoiceSearchModule };
export { NgAisVoiceSearch } from './voice-search/voice-search';

// Server-side rendering
export { createSSRSearchClient } from './create-ssr-search-client';

// Custom widget with BaseWidget class
export { BaseWidget, Widget, Connector } from './base-widget';
export { TypedBaseWidget } from './typed-base-widget';

// export { NgAisInstantSearch } from './instantsearch/instantsearch';
// export { NgAisIndex } from './index-widget/index-widget';

const NGIS_MODULES = [
  // NgAisInstantSearchModule,
  // NgAisIndexModule,
  // NgAisHitsModule,
  // NgAisSearchBoxModule,
  // NgAisClearRefinementsModule,
  // NgAisMenuModule,
  // NgAisPaginationModule,
  // NgAisRefinementListModule,
  // NgAisHitsPerPageModule,
  // NgAisSortByModule,
  // NgAisNumericMenuModule,
  // NgAisStatsModule,
  // NgAisToggleModule,
  // NgAisInfiniteHitsModule,
  // NgAisCurrentRefinementsModule,
  // NgAisHierarchicalMenuModule,
  // NgAisRatingMenuModule,
  // NgAisRangeSliderModule,
  // NgAisBreadcrumbModule,
  // NgAisHighlightModule,
  // NgAisReverseHighlightModule,
  // NgAisSnippetModule,
  // NgAisReverseSnippetModule,
  // NgAisRangeInputModule,
  // NgAisPanelModule,
  // NgAisConfigureModule,
  // NgAisConfigureRelatedItemsModule,
  // NgAisQueryRuleCustomDataModule,
  // NgAisQueryRuleContextModule,
  // NgAisVoiceSearchModule,
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
