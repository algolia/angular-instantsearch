// instantsearch.js
declare module "instantsearch.js/es";
declare module "instantsearch.js/es/connectors";

// angular-instantsearch
interface InstantSearchConfig {
  appId: string;
  apiKey: string;
  indexName: string;

  numberLocale?: string;
  searchFunction?: () => void;
  createAlgoliaClient?: () => object;
  searchParameters?: object | void;
  urlSync?:
    | boolean
    | {
        mapping?: object;
        threshold?: number;
        trackedParameters?: string[];
        useHash?: boolean;
        getHistoryState?: () => object;
      };
}

declare class Widget {
  public init: () => void;
  public getConfiguration: () => object;
  public render: (
    params: {
      templatesConfig: object;
      state: object;
      results: {}[];
      createURL: (value: any) => string;
      instantSearchInstance: object;
    }
  ) => void;
  public dispose: (
    params: {
      helper: object;
      state: object;
    }
  ) => object | void;
}

declare class InstantSearchInstance {
  public start: () => void;

  public addWidget: (widget: Widget) => void;
  public addWidgets: (widgets: Widget[]) => void;

  public removeWidget: (widget: Widget) => void;
  public removeWidgets: (widgets: Widget[]) => void;
}

type Connector = (
  renderFn: (state: object, isFirstRendering: boolean) => void,
  unmountFn: () => void
) => (widgetOptions?: object) => Widget;

interface BreadcrumbState {
  createURL: Function;
  items: BreadcrumbItem[];
  refine: Function;
}

interface BreadcrumbItem {
  name: string;
  value: string;
}

interface CurrentRefinedValuesState {
  attributes: {};
  clearAllClick: Function;
  clearAllURL: Function;
  createURL: Function;
  refine: Function;
  refinements: {}[];
}

interface HierarchicalMenuState {
  createURL: Function;
  items: {}[];
  refine: Function;
}

interface HierarchicalMenuItem {
  value: string;
  label: string;
  count: number;
  isRefined: boolean;
  data: HierarchicalMenuItem[];
}

interface HitsPerPageSelectorState {
  items: {}[];
  refine: Function;
}

interface MenuState {
  canRefine: boolean;
  canToggleShowMore: boolean;
  createURL: Function;
  isShowingMore: boolean;
  items: {}[];
  refine: Function;
  toggleShowMore: Function;
}

interface NumericRefinementListState {
  createURL: Function;
  items: {}[];
  refine: Function;
}

interface NumericSelectorState {
  currentRefinement?: string;
  options: {}[];
  refine: Function;
}

interface RangeSliderState {
  range: { min: number; max: number };
  refine: Function;
  start: number[];
}

interface RefinementListState {
  canRefine: boolean;
  canToggleShowMore: boolean;
  createURL: Function;
  isShowingMore: boolean;
  items: {}[];
  refine: Function;
  toggleShowMore: Function;
  searchForItems: Function;
  isFormSearch: boolean;
}

interface StarRatingState {
  createURL: Function;
  hasNoResults: boolean;
  items: {}[];
  refine: Function;
}
