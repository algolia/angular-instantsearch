webpackJsonp([2],{

/***/ 1058:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.VERSION = "1.0.0-beta.12";


/***/ }),

/***/ 1059:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var NgAisPanel = /** @class */ (function () {
    function NgAisPanel() {
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgAisPanel.prototype, "header", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgAisPanel.prototype, "footer", void 0);
    NgAisPanel = __decorate([
        core_1.Component({
            selector: "ng-ais-panel",
            template: "\n    <div class=\"ais-Panel\">\n      <div *ngIf=\"header\" class=\"ais-Panel-header\">\n        {{header}}\n      </div>\n\n      <div class=\"ais-Panel-body\">\n        <ng-content></ng-content>\n      </div>\n\n      <div *ngIf=\"footer\" class=\"ais-Panel-footer\">\n        {{footer}}\n      </div>\n    </div>\n  "
        })
    ], NgAisPanel);
    return NgAisPanel;
}());
exports.NgAisPanel = NgAisPanel;


/***/ }),

/***/ 1265:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var dev_novel_1 = __webpack_require__(1289);
var wrap_with_hits_1 = __webpack_require__(1620);
var custom_widgets_1 = __webpack_require__(2042);
// depending on the env mode, enable prod mode or add debugging modules
if (true) {
    core_1.enableProdMode();
}
dev_novel_1.storiesOf("InstantSearch").add("searchFunction with forced refinement", wrap_with_hits_1.wrapWithHits({
    template: "\n      <ng-ais-panel header=\"Brand\">\n        <ng-ais-refinement-list\n          attribute=\"brand\"\n          operator=\"or\"\n          [limit]=\"10\"\n        >\n        </ng-ais-refinement-list>\n      </ng-ais-panel>\n    ",
    searchParameters: {
        disjunctiveFacetsRefinements: { brand: ["Apple"] },
        disjunctiveFacets: ["brand"]
    },
    searchFunction: function (helper) {
        helper.addDisjunctiveFacetRefinement("brand", "Apple");
        helper.search();
    }
}));
dev_novel_1.storiesOf("Breadcrumb").add("default", wrap_with_hits_1.wrapWithHits({
    template: "\n      <ng-ais-breadcrumb\n        [attributes]=\"[\n          'hierarchicalCategories.lvl0',\n          'hierarchicalCategories.lvl1',\n          'hierarchicalCategories.lvl2'\n        ]\"\n      >\n      </ng-ais-breadcrumb>\n    ",
    searchParameters: {
        hierarchicalFacetsRefinements: {
            "hierarchicalCategories.lvl0": [
                "Cameras & Camcorders > Digital Cameras"
            ]
        }
    }
}));
dev_novel_1.storiesOf("ClearRefinements")
    .add("default", wrap_with_hits_1.wrapWithHits({
    template: "<ng-ais-clear-refinements></ng-ais-clear-refinements>",
    searchParameters: {
        disjunctiveFacetsRefinements: { brand: ["Apple"] },
        disjunctiveFacets: ["brand"]
    }
}))
    .add("with nothing to clear", wrap_with_hits_1.wrapWithHits({
    template: "<ng-ais-clear-refinements></ng-ais-clear-refinements>"
}))
    .add("with clear refinements and query", wrap_with_hits_1.wrapWithHits({
    template: "<ng-ais-clear-refinements [clearsQuery]='true'></ng-ais-clear-refinements>",
    searchParameters: {
        disjunctiveFacetsRefinements: { brand: ["Apple"] },
        disjunctiveFacets: ["brand"]
    }
}));
dev_novel_1.storiesOf("CurrentRefinements")
    .add("default", wrap_with_hits_1.wrapWithHits({
    template: "<ng-ais-current-refinements></ng-ais-current-refinements>",
    searchParameters: {
        disjunctiveFacetsRefinements: { brand: ["Apple", "Samsung"] },
        disjunctiveFacets: ["brand"],
        numericRefinements: { price: { ">=": [100] } }
    }
}))
    .add("with panel header", wrap_with_hits_1.wrapWithHits({
    template: "\n        <ng-ais-panel header='Current refinements'>\n          <ng-ais-current-refinements></ng-ais-current-refinements>\n        </ng-ais-panel>\n      ",
    searchParameters: {
        disjunctiveFacetsRefinements: { brand: ["Apple", "Samsung"] },
        disjunctiveFacets: ["brand"],
        numericRefinements: { price: { ">=": [100] } }
    }
}))
    .add("with panel header but no refinements", wrap_with_hits_1.wrapWithHits({
    template: "\n        <ng-ais-panel header='Current refinements'>\n          <ng-ais-current-refinements>\n          </ng-ais-current-refinements>\n        </ng-ais-panel>\n      "
}))
    .add("with clearsQuery", wrap_with_hits_1.wrapWithHits({
    template: "\n        <ng-ais-panel header='Current refinements'>\n          <ng-ais-current-refinements [clearsQuery]=\"true\">\n          </ng-ais-current-refinements>\n        </ng-ais-panel>\n      ",
    searchParameters: {
        disjunctiveFacetsRefinements: { brand: ["Apple", "Samsung"] },
        disjunctiveFacets: ["brand"],
        numericRefinements: { price: { ">=": [100] } }
    }
}));
dev_novel_1.storiesOf("HierarchicalMenu")
    .add("default", wrap_with_hits_1.wrapWithHits({
    template: "\n    <ng-ais-hierarchical-menu\n      [attributes]=\"[\n        'hierarchicalCategories.lvl0',\n        'hierarchicalCategories.lvl1',\n        'hierarchicalCategories.lvl2'\n      ]\"\n    >\n    </ng-ais-hierarchical-menu>\n  "
}))
    .add("hide parent level", wrap_with_hits_1.wrapWithHits({
    template: "\n        <ng-ais-hierarchical-menu\n          [showParentLevel]=\"false\"\n          [attributes]=\"[\n            'hierarchicalCategories.lvl0',\n            'hierarchicalCategories.lvl1',\n            'hierarchicalCategories.lvl2'\n          ]\"\n        >\n        </ng-ais-hierarchical-menu>\n      "
}))
    .add("with default selected item", wrap_with_hits_1.wrapWithHits({
    template: "\n        <ng-ais-hierarchical-menu\n          [attributes]=\"[\n            'hierarchicalCategories.lvl0',\n            'hierarchicalCategories.lvl1',\n            'hierarchicalCategories.lvl2'\n          ]\"\n        >\n        </ng-ais-hierarchical-menu>\n      ",
    searchParameters: {
        hierarchicalFacetsRefinements: {
            "hierarchicalCategories.lvl0": [
                "Cameras & Camcorders > Digital Cameras"
            ]
        }
    }
}));
dev_novel_1.storiesOf("Hits").add("default", wrap_with_hits_1.wrapWithHits({
    template: "<ng-ais-hits></ng-ais-hits>"
}));
dev_novel_1.storiesOf("HitsPerPage")
    .add("default", wrap_with_hits_1.wrapWithHits({
    template: "\n      <ng-ais-hits-per-page\n        [items]=\"[\n          { value: 3, label: '3 per page' },\n          { value: 5, label: '5 per page' },\n          { value: 10, label: '10 per page' }\n        ]\"\n      >\n      </ng-ais-hits-per-page>\n    "
}))
    .add("with default to 5", wrap_with_hits_1.wrapWithHits({
    template: "\n        <ng-ais-hits-per-page\n          [items]=\"[\n            { value: 3, label: '3 per page' },\n            { value: 5, label: '5 per page', default: true },\n            { value: 10, label: '10 per page' }\n          ]\"\n        >\n        </ng-ais-hits-per-page>\n      "
}));
dev_novel_1.storiesOf("InfiniteHits")
    .add("default", wrap_with_hits_1.wrapWithHits({
    template: "<ng-ais-infinite-hits></ng-ais-infinite-hits>"
}))
    .add("with custom template", wrap_with_hits_1.wrapWithHits({
    template: "\n        <ng-ais-infinite-hits>\n          <ng-template\n            let-hits=\"hits\"\n            let-showMore=\"showMore\"\n          >\n            <div *ngFor=\"let hit of hits\">\n              <strong>{{hit.name}}</strong>\n            </div>\n            <button (click)=\"showMore()\">Load more</button>\n          </ng-template>\n        </ng-ais-infinite-hits>\n      "
}));
dev_novel_1.storiesOf("Menu")
    .add("default", wrap_with_hits_1.wrapWithHits({
    template: '<ng-ais-menu attribute="categories"></ng-ais-menu>'
}))
    .add("with showMore and panel header", wrap_with_hits_1.wrapWithHits({
    template: "\n        <ng-ais-panel header=\"Categories\">\n          <ng-ais-menu\n            attribute=\"categories\"\n            [limit]=\"3\"\n            [showMoreLimit]=\"10\"\n          >\n          </ng-ais-menu>\n        </ng-ais-panel>\n      "
}));
dev_novel_1.storiesOf("NumericMenu").add("default with panel header", wrap_with_hits_1.wrapWithHits({
    template: "\n      <ng-ais-panel header=\"Numeric menu (price)\">\n        <ng-ais-numeric-menu\n          attribute=\"price\"\n          operator=\"or\"\n          [items]=\"[\n            { name: 'All' },\n            { end: 4, name: 'less than 4' },\n            { start: 4, end: 4, name: '4' },\n            { start: 5, end: 10, name: 'between 5 and 10' },\n            { start: 10, name: 'more than 10' }\n          ]\"\n        >\n        </ng-ais-numeric-menu>\n      </ng-ais-panel>\n    "
}));
dev_novel_1.storiesOf("NumericSelector")
    .add("default", wrap_with_hits_1.wrapWithHits({
    template: "\n        <ng-ais-numeric-selector\n          attribute=\"popularity\"\n          operator=\">=\"\n          [items]=\"[\n            { label: 'Default', value: 0 },\n            { label: 'Top 10', value: 21459 },\n            { label: 'Top 100', value: 21369 },\n            { label: 'Top 500', value: 20969 }\n          ]\"\n        >\n        </ng-ais-numeric-selector>\n      "
}))
    .add("with default value", wrap_with_hits_1.wrapWithHits({
    template: "\n        <ng-ais-numeric-selector\n          attribute=\"rating\"\n          operator=\"=\"\n          [items]=\"[\n            { label: 'No rating selected', value: undefined },\n            { label: 'Rating: 5', value: 5 },\n            { label: 'Rating: 4', value: 4 },\n            { label: 'Rating: 3', value: 3 },\n            { label: 'Rating: 2', value: 2 },\n            { label: 'Rating: 1', value: 1 }\n          ]\"\n        >\n        </ng-ais-numeric-selector>\n      "
}));
dev_novel_1.storiesOf("Pagination").add("default", wrap_with_hits_1.wrapWithHits({
    template: "<ng-ais-pagination></ng-ais-pagination>"
}));
dev_novel_1.storiesOf("RefinementList")
    .add("default with panel header", wrap_with_hits_1.wrapWithHits({
    template: "\n        <ng-ais-panel header=\"Brand\">\n          <ng-ais-refinement-list\n            attribute=\"brand\"\n            operator=\"or\"\n            [limit]=\"10\"\n          >\n          </ng-ais-refinement-list>\n        </ng-ais-panel>\n      "
}))
    .add("panel header with showMore", wrap_with_hits_1.wrapWithHits({
    template: "\n        <ng-ais-panel header=\"Brand with show more\">\n          <ng-ais-refinement-list\n            attribute=\"brand\"\n            operator=\"or\"\n            [limit]=\"3\"\n            [showMoreLimit]=\"10\"\n          >\n          </ng-ais-refinement-list>\n        </ng-ais-panel>\n      "
}))
    .add("panel header with search inside the items", wrap_with_hits_1.wrapWithHits({
    template: "\n        <ng-ais-panel header=\"Searchable brands\">\n          <ng-ais-refinement-list\n            attribute=\"brand\"\n            operator=\"or\"\n            searchPlaceholder=\"Find other brands...\"\n            [searchable]=\"true\"\n            [limit]=\"10\"\n          >\n          </ng-ais-refinement-list>\n        </ng-ais-panel>\n      "
}))
    .add("panel header with operator `and`", wrap_with_hits_1.wrapWithHits({
    template: "\n        <ng-ais-panel header=\"Price ranges\">\n          <ng-ais-refinement-list\n            attribute=\"price_range\"\n            operator=\"and\"\n            [limit]=\"10\"\n            [transformItems]=\"transformItems\"\n          >\n          </ng-ais-refinement-list>\n        </ng-ais-panel>\n      ",
    methods: {
        transformItems: function (items) {
            return items.map(function (item) {
                item.highlighted = item.highlighted
                    .replace(/(\d+) - (\d+)/, "$$$1 - $$$2")
                    .replace(/> (\d+)/, "> $$$1");
                return item;
            });
        }
    }
}));
dev_novel_1.storiesOf("SearchBox")
    .add("default", wrap_with_hits_1.wrapWithHits({
    template: "<ng-ais-search-box placeholder='Search for products'></ng-ais-search-box>"
}))
    .add("search on enter", wrap_with_hits_1.wrapWithHits({
    template: "\n        <ng-ais-search-box\n          placeholder=\"Search for products\"\n          [searchAsYouType]=\"false\"\n        >\n        </ng-ais-search-box>\n      "
}));
dev_novel_1.storiesOf("SortBy").add("default", wrap_with_hits_1.wrapWithHits({
    template: "\n      <ng-ais-sort-by\n        [items]=\"[\n          { name: 'instant_search', label: 'Most relevant' },\n          { name: 'instant_search_price_asc', label: 'Lowest price' },\n          { name: 'instant_search_price_desc', label: 'Highest price' }\n        ]\"\n      >\n      </ng-ais-sort-by>\n    "
}));
dev_novel_1.storiesOf("RatingMenu").add("default with panel header", wrap_with_hits_1.wrapWithHits({
    template: "\n      <ng-ais-panel header=\"Rating\">\n        <ng-ais-rating-menu\n          attribute=\"rating\"\n          [max]=\"5\"\n        >\n        </ng-ais-rating-menu>\n      </ng-ais-panel>\n    "
}));
dev_novel_1.storiesOf("Stats").add("default", wrap_with_hits_1.wrapWithHits({
    template: "<ng-ais-stats></ng-ais-stats>"
}));
dev_novel_1.storiesOf("Toggle")
    .add("with single value", wrap_with_hits_1.wrapWithHits({
    template: "\n        <ng-ais-toggle\n          label=\"Free Shipping (toggle single value)\"\n          attribute=\"free_shipping\"\n        >\n        </ng-ais-toggle>\n      "
}))
    .add("with on & off values", wrap_with_hits_1.wrapWithHits({
    template: "\n        <ng-ais-toggle\n          label=\"Canon (not checked) or Sony (checked)\"\n          attribute=\"brand\"\n          [values]=\"{\n            on: 'Sony',\n            off: 'Canon'\n          }\"\n        >\n        </ng-ais-toggle>\n      "
}));
dev_novel_1.storiesOf("RangeInput").add("default", wrap_with_hits_1.wrapWithHits({
    template: "\n      <ng-ais-range-input attributeName=\"price\">\n      </ng-ais-range-input>\n    "
}));
dev_novel_1.storiesOf("CustomWidgets").add("MenuSelect", wrap_with_hits_1.wrapWithHits({
    template: "<ng-ais-menu-select></ng-ais-menu-select>",
    appDeclarations: [custom_widgets_1.MenuSelect]
}));
dev_novel_1.storiesOf("RangeSlider").add("default", wrap_with_hits_1.wrapWithHits({
    template: "\n      <ng-ais-range-slider attribute=\"price\">\n      </ng-ais-range-slider>\n    "
}));
dev_novel_1.start({
    projectName: "Angular InstantSearch",
    projectLink: "https://github.com/algolia/angular-instantsearch"
});


/***/ }),

/***/ 1620:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var platform_browser_1 = __webpack_require__(920);
var platform_browser_dynamic_1 = __webpack_require__(1621);
var angular_instantsearch_1 = __webpack_require__(921);
function wrapWithHits(_a) {
    var template = _a.template, _b = _a.styles, styles = _b === void 0 ? "" : _b, _c = _a.searchParameters, searchParameters = _c === void 0 ? {} : _c, _d = _a.methods, methods = _d === void 0 ? {} : _d, searchFunction = _a.searchFunction, _e = _a.appDeclarations, appDeclarations = _e === void 0 ? [] : _e;
    return function (container) {
        var AppComponent = /** @class */ (function () {
            function AppComponent() {
                var _this = this;
                this.config = {
                    searchFunction: searchFunction,
                    apiKey: "6be0576ff61c053d5f9a3225e2a90f76",
                    appId: "latency",
                    indexName: "instant_search",
                    searchParameters: __assign({ hitsPerPage: 3 }, searchParameters)
                };
                Object.keys(methods).forEach(function (methodName) {
                    _this[methodName] = methods[methodName];
                });
            }
            AppComponent = __decorate([
                core_1.Component({
                    selector: "ng-ais-app",
                    template: "\n      <ng-ais-instantsearch [config]=\"config\">\n        <div id=\"widget-display\">\n          " + template + "\n        </div>\n        <div id=\"results-display\">\n          <div id=\"results-search-box-container\">\n            <ng-ais-search-box\n              placeholder=\"Search into furnitures\"\n            >\n            </ng-ais-search-box>\n          </div>\n          <div id=\"results-hits-container\">\n            <ng-ais-hits>\n              <ng-template let-hits=\"hits\">\n                <div\n                  *ngFor=\"let hit of hits\"\n                  class=\"hit\"\n                  id=\"hit-{{hit.objectID}}\"\n                >\n                  <div class=\"hit-picture\">\n                    <img [src]=\"hit.image\" />\n                  </div>\n\n                  <div class=\"hit-content\">\n                    <div>\n                      <ng-ais-highlight [hit]=\"hit\" attributeName=\"name\"></ng-ais-highlight>\n                      <span>${{hit.price}}</span>\n                      <span>{{hit.rating}} stars</span>\n                    </div>\n\n                    <div class=\"hit-description\">\n                      <ng-ais-highlight\n                        [hit]=\"hit\"\n                        attributeName=\"description\"\n                      >\n                      </ng-ais-highlight>\n                    </div>\n                  </div>\n                </div>\n              </ng-template>\n            </ng-ais-hits>\n          </div>\n          <div id=\"results-pagination-container\">\n            <ng-ais-pagination [totalPages]=\"20\"></ng-ais-pagination>\n          </div>\n        </div>\n      </ng-ais-instantsearch>\n    ",
                    styles: [
                        styles,
                        "\n        #widget-display {\n          border: solid 1px #E4E4E4;\n          border-radius: 5px 5px 0 0;\n          border-bottom: none;\n          margin: 5px 5px 0 5px;\n          min-height: 200px;\n          padding: 50px 40px 40px;\n        }\n\n        #results-display {\n          border: solid 1px #E4E4E4;\n          border-radius: 0 0 5px 5px;\n          display: flex;\n          flex-direction: column;\n          margin: 0 5px 5px 5px;\n          min-height: 200px;\n          padding: 50px 40px 40px;\n        }\n\n        #results-display .hit {\n          align-items: center;\n          display: flex;\n          margin: 10px 10px;\n        }\n\n        #results-display .hit .hit-picture img {\n          height: auto;\n          width: 80px;\n        }\n\n        #results-display .hit .hit-content {\n          padding: 0 10px;\n        }\n      "
                    ]
                }),
                __metadata("design:paramtypes", [])
            ], AppComponent);
            return AppComponent;
        }());
        var NgApp = /** @class */ (function () {
            function NgApp() {
            }
            NgApp = __decorate([
                core_1.NgModule({
                    bootstrap: [AppComponent],
                    declarations: [AppComponent].concat(appDeclarations),
                    imports: [platform_browser_1.BrowserModule, angular_instantsearch_1.NgAisModule.forRoot()],
                    providers: []
                })
            ], NgApp);
            return NgApp;
        }());
        container.innerHTML = "<ng-ais-app></ng-ais-app>";
        platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(NgApp);
    };
}
exports.wrapWithHits = wrapWithHits;


/***/ }),

/***/ 1623:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = __webpack_require__(14);
var core_1 = __webpack_require__(1);
var breadcrumb_1 = __webpack_require__(1624);
var NgAisBreadcrumbModule = /** @class */ (function () {
    function NgAisBreadcrumbModule() {
    }
    NgAisBreadcrumbModule = __decorate([
        core_1.NgModule({
            declarations: [breadcrumb_1.NgAisBreadcrumb],
            entryComponents: [breadcrumb_1.NgAisBreadcrumb],
            exports: [breadcrumb_1.NgAisBreadcrumb],
            imports: [common_1.CommonModule]
        })
    ], NgAisBreadcrumbModule);
    return NgAisBreadcrumbModule;
}());
exports.NgAisBreadcrumbModule = NgAisBreadcrumbModule;


/***/ }),

/***/ 1624:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var connectors_1 = __webpack_require__(28);
var lodash_es_1 = __webpack_require__(30);
var base_widget_1 = __webpack_require__(32);
var instantsearch_1 = __webpack_require__(26);
var NgAisBreadcrumb = /** @class */ (function (_super) {
    __extends(NgAisBreadcrumb, _super);
    function NgAisBreadcrumb(instantSearchParent) {
        var _this = _super.call(this, "Breadcrumb") || this;
        _this.instantSearchParent = instantSearchParent;
        _this.state = {
            createURL: lodash_es_1.noop,
            items: [],
            refine: lodash_es_1.noop
        };
        return _this;
    }
    Object.defineProperty(NgAisBreadcrumb.prototype, "isHidden", {
        get: function () {
            return this.state.items.length === 0 && this.autoHideContainer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgAisBreadcrumb.prototype, "items", {
        get: function () {
            var _this = this;
            return this.state.items.map(function (item, idx) { return (__assign({}, item, { separator: idx !== 0, isLast: idx === _this.state.items.length - 1 })); });
        },
        enumerable: true,
        configurable: true
    });
    NgAisBreadcrumb.prototype.ngOnInit = function () {
        this.createWidget(connectors_1.connectBreadcrumb, {
            attributes: this.attributes,
            rootPath: this.rootPath
        });
        _super.prototype.ngOnInit.call(this);
    };
    NgAisBreadcrumb.prototype.handleClick = function (event, item) {
        event.preventDefault();
        event.stopPropagation();
        if (item.value) {
            this.state.refine(item.value);
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], NgAisBreadcrumb.prototype, "attributes", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgAisBreadcrumb.prototype, "rootPath", void 0);
    NgAisBreadcrumb = __decorate([
        core_1.Component({
            selector: "ng-ais-breadcrumb",
            template: "\n    <div\n      [class]=\"cx()\"\n      *ngIf=\"!isHidden\"\n    >\n      <ul [class]=\"cx('list')\">\n        <li\n          *ngFor=\"let item of items\"\n          [class]=\"cx('item', item.isLast ? 'selected' : undefined)\"\n          (click)=\"handleClick($event, item)\"\n        >\n          <span\n            *ngIf=\"item.separator\"\n            [class]=\"cx('separator')\"\n            aria-hidden=\"true\"\n          >\n            >\n          </span>\n          <a\n            [class]=\"cx('link')\"\n            href=\"{{state.createURL(item.value)}}\"\n            *ngIf=\"!item.isLast\"\n            (click)=\"handleClick($event, item)\"\n          >\n            {{item.name}}\n          </a>\n\n          <span *ngIf=\"item.isLast\">\n            {{item.name}}\n          </span>\n        </li>\n      </ul>\n    </div>\n  "
        }),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return instantsearch_1.NgAisInstantSearch; }))),
        __metadata("design:paramtypes", [Object])
    ], NgAisBreadcrumb);
    return NgAisBreadcrumb;
}(base_widget_1.BaseWidget));
exports.NgAisBreadcrumb = NgAisBreadcrumb;


/***/ }),

/***/ 1977:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = __webpack_require__(14);
var core_1 = __webpack_require__(1);
var clear_refinements_1 = __webpack_require__(1978);
var NgAisClearRefinementsModule = /** @class */ (function () {
    function NgAisClearRefinementsModule() {
    }
    NgAisClearRefinementsModule = __decorate([
        core_1.NgModule({
            declarations: [clear_refinements_1.NgAisClearRefinements],
            entryComponents: [clear_refinements_1.NgAisClearRefinements],
            exports: [clear_refinements_1.NgAisClearRefinements],
            imports: [common_1.CommonModule]
        })
    ], NgAisClearRefinementsModule);
    return NgAisClearRefinementsModule;
}());
exports.NgAisClearRefinementsModule = NgAisClearRefinementsModule;


/***/ }),

/***/ 1978:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var connectors_1 = __webpack_require__(28);
var lodash_es_1 = __webpack_require__(30);
var base_widget_1 = __webpack_require__(32);
var instantsearch_1 = __webpack_require__(26);
var NgAisClearRefinements = /** @class */ (function (_super) {
    __extends(NgAisClearRefinements, _super);
    function NgAisClearRefinements(instantSearchParent) {
        var _this = _super.call(this, "ClearRefinements") || this;
        _this.instantSearchParent = instantSearchParent;
        _this.buttonLabel = "Clear refinements";
        _this.clearsQuery = false;
        _this.excludeAttributes = [];
        _this.state = { hasRefinements: false, refine: lodash_es_1.noop };
        return _this;
    }
    Object.defineProperty(NgAisClearRefinements.prototype, "isHidden", {
        get: function () {
            return !this.state.hasRefinements && this.autoHideContainer;
        },
        enumerable: true,
        configurable: true
    });
    NgAisClearRefinements.prototype.ngOnInit = function () {
        // we need to `createWidget` from `ngOnInit` to have `@Input()` intialized
        this.createWidget(connectors_1.connectClearAll, {
            clearsQuery: this.clearsQuery,
            excludeAttributes: this.excludeAttributes
        });
        _super.prototype.ngOnInit.call(this);
    };
    NgAisClearRefinements.prototype.handleClick = function (event) {
        event.preventDefault();
        if (this.state.hasRefinements) {
            this.state.refine();
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgAisClearRefinements.prototype, "buttonLabel", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], NgAisClearRefinements.prototype, "clearsQuery", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], NgAisClearRefinements.prototype, "excludeAttributes", void 0);
    NgAisClearRefinements = __decorate([
        core_1.Component({
            selector: "ng-ais-clear-refinements",
            template: "\n    <div\n      [class]=\"cx()\"\n      *ngIf=\"!isHidden\"\n    >\n      <button\n        [class]=\"cx('button') + (!state.hasRefinements ? (' ' + cx('button', 'disabled')) : '')\"\n        (click)=\"handleClick($event)\"\n        [disabled]=\"!state.hasRefinements\"\n      >\n        {{buttonLabel}}\n      </button>\n    </div>\n  "
        }),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return instantsearch_1.NgAisInstantSearch; }))),
        __metadata("design:paramtypes", [Object])
    ], NgAisClearRefinements);
    return NgAisClearRefinements;
}(base_widget_1.BaseWidget));
exports.NgAisClearRefinements = NgAisClearRefinements;


/***/ }),

/***/ 1979:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = __webpack_require__(14);
var core_1 = __webpack_require__(1);
var current_refinements_1 = __webpack_require__(1980);
var NgAisCurrentRefinementsModule = /** @class */ (function () {
    function NgAisCurrentRefinementsModule() {
    }
    NgAisCurrentRefinementsModule = __decorate([
        core_1.NgModule({
            declarations: [current_refinements_1.NgAisCurrentRefinements],
            entryComponents: [current_refinements_1.NgAisCurrentRefinements],
            exports: [current_refinements_1.NgAisCurrentRefinements],
            imports: [common_1.CommonModule]
        })
    ], NgAisCurrentRefinementsModule);
    return NgAisCurrentRefinementsModule;
}());
exports.NgAisCurrentRefinementsModule = NgAisCurrentRefinementsModule;


/***/ }),

/***/ 1980:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var connectors_1 = __webpack_require__(28);
var lodash_es_1 = __webpack_require__(30);
var base_widget_1 = __webpack_require__(32);
var instantsearch_1 = __webpack_require__(26);
var NgAisCurrentRefinements = /** @class */ (function (_super) {
    __extends(NgAisCurrentRefinements, _super);
    function NgAisCurrentRefinements(instantSearchParent) {
        var _this = _super.call(this, "CurrentRefinements") || this;
        _this.instantSearchParent = instantSearchParent;
        // render options
        _this.clearRefinements = "after";
        _this.clearRefinementsLabel = "Clear refinements";
        // connector options
        _this.onlyListedAttributes = false;
        _this.clearsQuery = false;
        _this.attributes = [];
        _this.state = {
            attributes: {},
            clearAllClick: lodash_es_1.noop,
            clearAllURL: lodash_es_1.noop,
            createURL: lodash_es_1.noop,
            refine: lodash_es_1.noop,
            refinements: []
        };
        return _this;
    }
    Object.defineProperty(NgAisCurrentRefinements.prototype, "isHidden", {
        get: function () {
            return this.state.refinements.length === 0 && this.autoHideContainer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgAisCurrentRefinements.prototype, "refinements", {
        get: function () {
            var items = lodash_es_1.isFunction(this.transformItems)
                ? this.transformItems(this.state.refinements)
                : this.state.refinements;
            // group refinements by category? (attributeName && type)
            return items.reduce(function (res, _a) {
                var type = _a.type, attributeName = _a.attributeName, refinement = __rest(_a, ["type", "attributeName"]);
                var match = res.find(function (r) { return r.attributeName === attributeName && r.type === type; });
                if (match) {
                    match.items.push(__assign({ type: type, attributeName: attributeName }, refinement));
                }
                else {
                    res.push({
                        type: type,
                        attributeName: attributeName,
                        label: lodash_es_1.capitalize(attributeName),
                        items: [__assign({ type: type, attributeName: attributeName }, refinement)]
                    });
                }
                return res;
            }, []);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgAisCurrentRefinements.prototype, "json", {
        get: function () {
            return JSON.stringify(this.refinements, null, 4);
        },
        enumerable: true,
        configurable: true
    });
    NgAisCurrentRefinements.prototype.ngOnInit = function () {
        this.createWidget(connectors_1.connectCurrentRefinedValues, {
            attributes: this.attributes,
            clearsQuery: this.clearsQuery,
            onlyListedAttributes: this.onlyListedAttributes
        });
        _super.prototype.ngOnInit.call(this);
    };
    NgAisCurrentRefinements.prototype.handleClick = function (event, refinement) {
        event.preventDefault();
        this.state.refine(refinement);
    };
    NgAisCurrentRefinements.prototype.handleClearAllClick = function (event) {
        event.preventDefault();
        this.state.clearAllClick();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NgAisCurrentRefinements.prototype, "clearRefinements", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgAisCurrentRefinements.prototype, "clearRefinementsLabel", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Function)
    ], NgAisCurrentRefinements.prototype, "transformItems", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], NgAisCurrentRefinements.prototype, "onlyListedAttributes", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], NgAisCurrentRefinements.prototype, "clearsQuery", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], NgAisCurrentRefinements.prototype, "attributes", void 0);
    NgAisCurrentRefinements = __decorate([
        core_1.Component({
            selector: "ng-ais-current-refinements",
            template: "\n    <div\n      [class]=\"cx()\"\n      *ngIf=\"!isHidden\"\n    >\n      <button\n        [class]=\"cx('reset')\"\n        (click)=\"handleClearAllClick($event)\"\n        *ngIf=\"clearRefinements === 'before' || clearRefinements === true\">\n        {{clearRefinementsLabel}}\n      </button>\n\n      <ul\n        [class]=\"cx('list')\"\n        *ngFor=\"let refinement of refinements\"\n      >\n        <li [class]=\"cx('item')\">\n          <span [class]=\"cx('label')\">{{refinement.label}}:</span>\n\n          <span\n            [class]=\"cx('category')\"\n            *ngFor=\"let item of refinement.items\"\n          >\n            <span [class]=\"cx('categoryLabel')\">{{item.name}}</span>\n            <button [class]=\"cx('delete')\" (click)=\"handleClick($event, item)\">\u2715</button>\n          </span>\n        </li>\n      </ul>\n\n      <button\n        [class]=\"cx('reset')\"\n        (click)=\"handleClearAllClick($event)\"\n        *ngIf=\"clearRefinements === 'after'\">\n        {{clearRefinementsLabel}}\n      </button>\n    </div>\n  "
        }),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return instantsearch_1.NgAisInstantSearch; }))),
        __metadata("design:paramtypes", [Object])
    ], NgAisCurrentRefinements);
    return NgAisCurrentRefinements;
}(base_widget_1.BaseWidget));
exports.NgAisCurrentRefinements = NgAisCurrentRefinements;


/***/ }),

/***/ 1981:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = __webpack_require__(14);
var core_1 = __webpack_require__(1);
var hierarchical_menu_1 = __webpack_require__(1982);
var hierarchical_menu_item_1 = __webpack_require__(1983);
var NgAisHierarchicalMenuModule = /** @class */ (function () {
    function NgAisHierarchicalMenuModule() {
    }
    NgAisHierarchicalMenuModule = __decorate([
        core_1.NgModule({
            declarations: [hierarchical_menu_1.NgAisHierarchicalMenu, hierarchical_menu_item_1.NgAisHierarchicalMenuItem],
            entryComponents: [hierarchical_menu_1.NgAisHierarchicalMenu],
            exports: [hierarchical_menu_1.NgAisHierarchicalMenu],
            imports: [common_1.CommonModule]
        })
    ], NgAisHierarchicalMenuModule);
    return NgAisHierarchicalMenuModule;
}());
exports.NgAisHierarchicalMenuModule = NgAisHierarchicalMenuModule;


/***/ }),

/***/ 1982:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var connectors_1 = __webpack_require__(28);
var lodash_es_1 = __webpack_require__(30);
var base_widget_1 = __webpack_require__(32);
var instantsearch_1 = __webpack_require__(26);
var utils_1 = __webpack_require__(90);
var NgAisHierarchicalMenu = /** @class */ (function (_super) {
    __extends(NgAisHierarchicalMenu, _super);
    function NgAisHierarchicalMenu(instantSearchParent) {
        var _this = _super.call(this, "HierarchicalMenu") || this;
        _this.instantSearchParent = instantSearchParent;
        _this.separator = " > ";
        _this.limit = 10;
        _this.state = {
            createURL: lodash_es_1.noop,
            items: [],
            refine: lodash_es_1.noop
        };
        return _this;
    }
    Object.defineProperty(NgAisHierarchicalMenu.prototype, "isHidden", {
        get: function () {
            return this.state.items.length === 0 && this.autoHideContainer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgAisHierarchicalMenu.prototype, "items", {
        get: function () {
            return lodash_es_1.isFunction(this.transformItems)
                ? this.transformItems(this.state.items)
                : this.state.items;
        },
        enumerable: true,
        configurable: true
    });
    NgAisHierarchicalMenu.prototype.ngOnInit = function () {
        this.createWidget(connectors_1.connectHierarchicalMenu, {
            limit: utils_1.parseNumberInput(this.limit),
            attributes: this.attributes,
            rootPath: this.rootPath,
            separator: this.separator,
            showParentLevel: this.showParentLevel,
            sortBy: this.sortBy
        });
        _super.prototype.ngOnInit.call(this);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Function)
    ], NgAisHierarchicalMenu.prototype, "transformItems", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], NgAisHierarchicalMenu.prototype, "attributes", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgAisHierarchicalMenu.prototype, "separator", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgAisHierarchicalMenu.prototype, "rootPath", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], NgAisHierarchicalMenu.prototype, "showParentLevel", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NgAisHierarchicalMenu.prototype, "limit", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NgAisHierarchicalMenu.prototype, "sortBy", void 0);
    NgAisHierarchicalMenu = __decorate([
        core_1.Component({
            selector: "ng-ais-hierarchical-menu",
            template: "\n    <div\n      [class]=\"cx()\"\n      *ngIf=\"!isHidden\"\n    >\n      <ul [class]=\"cx('list') + ' ' + cx('list', 'lvl0')\">\n        <ng-ais-hierarchical-menu-item\n          *ngFor=\"let item of items\"\n          [item]=\"item\"\n          [createURL]=\"state.createURL\"\n          [refine]=\"state.refine\"\n        >\n        </ng-ais-hierarchical-menu-item>\n      </ul>\n    </div>\n  "
        }),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return instantsearch_1.NgAisInstantSearch; }))),
        __metadata("design:paramtypes", [Object])
    ], NgAisHierarchicalMenu);
    return NgAisHierarchicalMenu;
}(base_widget_1.BaseWidget));
exports.NgAisHierarchicalMenu = NgAisHierarchicalMenu;


/***/ }),

/***/ 1983:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var utils_1 = __webpack_require__(90);
var NgAisHierarchicalMenuItem = /** @class */ (function () {
    function NgAisHierarchicalMenuItem() {
        this.lvl = 1;
        this.cx = utils_1.bem("HierarchicalMenu");
    }
    NgAisHierarchicalMenuItem.prototype.getItemClass = function (item) {
        var className = this.cx("item");
        if (item.isRefined) {
            className = className + " " + this.cx("item", "selected");
        }
        if (this.isArray(item.data) && item.data.length > 0) {
            className = className + " " + this.cx("item", "parent");
        }
        return className;
    };
    NgAisHierarchicalMenuItem.prototype.getListClass = function (item) {
        return this.cx("list") + " " + this.cx("list", "child") + " " + this.cx("list", "lvl" + this.lvl);
    };
    NgAisHierarchicalMenuItem.prototype.isArray = function (potentialArray) {
        return Array.isArray(potentialArray);
    };
    NgAisHierarchicalMenuItem.prototype.handleClick = function (event, item) {
        event.preventDefault();
        event.stopPropagation();
        this.refine(item.value);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], NgAisHierarchicalMenuItem.prototype, "lvl", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Function)
    ], NgAisHierarchicalMenuItem.prototype, "refine", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Function)
    ], NgAisHierarchicalMenuItem.prototype, "createURL", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NgAisHierarchicalMenuItem.prototype, "item", void 0);
    NgAisHierarchicalMenuItem = __decorate([
        core_1.Component({
            selector: "ng-ais-hierarchical-menu-item",
            template: "\n    <li\n      [class]=\"getItemClass(item)\"\n      (click)=\"handleClick($event, item)\"\n    >\n      <a\n        [class]=\"cx('link')\"\n        href=\"{{createURL(item.value)}}\"\n        (click)=\"handleClick($event, item)\"\n      >\n        <span [class]=\"cx('label')\">{{item.label}}</span>\n        <span [class]=\"cx('count')\">{{item.count}}</span>\n      </a>\n\n      <ul\n        [class]=\"getListClass(item)\"\n        *ngIf=\"item.isRefined && isArray(item.data) && item.data.length > 0\"\n      >\n        <ng-ais-hierarchical-menu-item\n          *ngFor=\"let child of item.data\"\n          [item]=\"child\"\n          [createURL]=\"createURL\"\n          [refine]=\"refine\"\n          [lvl]=\"lvl + 1\"\n        >\n        </ng-ais-hierarchical-menu-item>\n      </ul>\n    </li>\n  "
        })
    ], NgAisHierarchicalMenuItem);
    return NgAisHierarchicalMenuItem;
}());
exports.NgAisHierarchicalMenuItem = NgAisHierarchicalMenuItem;


/***/ }),

/***/ 1984:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = __webpack_require__(14);
var core_1 = __webpack_require__(1);
var hits_per_page_1 = __webpack_require__(1985);
var NgAisHitsPerPageModule = /** @class */ (function () {
    function NgAisHitsPerPageModule() {
    }
    NgAisHitsPerPageModule = __decorate([
        core_1.NgModule({
            declarations: [hits_per_page_1.NgAisHitsPerPage],
            entryComponents: [hits_per_page_1.NgAisHitsPerPage],
            exports: [hits_per_page_1.NgAisHitsPerPage],
            imports: [common_1.CommonModule]
        })
    ], NgAisHitsPerPageModule);
    return NgAisHitsPerPageModule;
}());
exports.NgAisHitsPerPageModule = NgAisHitsPerPageModule;


/***/ }),

/***/ 1985:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var connectors_1 = __webpack_require__(28);
var lodash_es_1 = __webpack_require__(30);
var base_widget_1 = __webpack_require__(32);
var instantsearch_1 = __webpack_require__(26);
var NgAisHitsPerPage = /** @class */ (function (_super) {
    __extends(NgAisHitsPerPage, _super);
    function NgAisHitsPerPage(instantSearchParent) {
        var _this = _super.call(this, "HitsPerPage") || this;
        _this.instantSearchParent = instantSearchParent;
        _this.state = {
            items: [],
            refine: lodash_es_1.noop
        };
        return _this;
    }
    Object.defineProperty(NgAisHitsPerPage.prototype, "isHidden", {
        get: function () {
            return this.state.items.length === 0 && this.autoHideContainer;
        },
        enumerable: true,
        configurable: true
    });
    NgAisHitsPerPage.prototype.ngOnInit = function () {
        this.createWidget(connectors_1.connectHitsPerPage, { items: this.items });
        _super.prototype.ngOnInit.call(this);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], NgAisHitsPerPage.prototype, "items", void 0);
    NgAisHitsPerPage = __decorate([
        core_1.Component({
            selector: "ng-ais-hits-per-page",
            template: "\n    <div\n      [class]=\"cx()\"\n      *ngIf=\"!isHidden\"\n    >\n      <select\n        [class]=\"cx('select')\"\n        (change)=\"state.refine($event.target.value)\"\n      >\n        <option\n          [class]=\"cx('option')\"\n          *ngFor=\"let item of state.items\"\n          [value]=\"item.value\"\n          [selected]=\"item.isRefined\"\n        >\n          {{item.label}}\n        </option>\n      </select>\n    </div>\n  "
        }),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return instantsearch_1.NgAisInstantSearch; }))),
        __metadata("design:paramtypes", [Object])
    ], NgAisHitsPerPage);
    return NgAisHitsPerPage;
}(base_widget_1.BaseWidget));
exports.NgAisHitsPerPage = NgAisHitsPerPage;


/***/ }),

/***/ 1986:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = __webpack_require__(14);
var core_1 = __webpack_require__(1);
var highlight_module_1 = __webpack_require__(388);
var hits_1 = __webpack_require__(1988);
var NgAisHitsModule = /** @class */ (function () {
    function NgAisHitsModule() {
    }
    NgAisHitsModule = __decorate([
        core_1.NgModule({
            declarations: [hits_1.NgAisHits],
            entryComponents: [hits_1.NgAisHits],
            exports: [hits_1.NgAisHits],
            imports: [common_1.CommonModule, highlight_module_1.NgAisHighlightModule]
        })
    ], NgAisHitsModule);
    return NgAisHitsModule;
}());
exports.NgAisHitsModule = NgAisHitsModule;


/***/ }),

/***/ 1987:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var lodash_es_1 = __webpack_require__(30);
var utils_1 = __webpack_require__(90);
var NgAisHighlight = /** @class */ (function () {
    function NgAisHighlight() {
        this.tagName = "em";
        this.cx = utils_1.bem("Highlight");
    }
    Object.defineProperty(NgAisHighlight.prototype, "content", {
        get: function () {
            if (this.attributeName === "highlighted") {
                return this.hit.highlighted
                    ? this.replaceWithTagName(this.hit.highlighted)
                    : this.hit.label;
            }
            if (this.hit.hasOwnProperty("_highlightResult")) {
                var attributeHighlighted = lodash_es_1.get(this.hit._highlightResult, this.attributeName);
                // check that the attributeHighlighted is a string
                if (lodash_es_1.isPlainObject(attributeHighlighted) &&
                    typeof attributeHighlighted.value === "string") {
                    return this.replaceWithTagName(attributeHighlighted.value);
                }
            }
            var fallback = lodash_es_1.get(this.hit, this.attributeName);
            if (!fallback) {
                console.warn("Could not find attributeName [" + this.attributeName + "] into hit object, will display an empty string.");
                return "";
            }
            return fallback;
        },
        enumerable: true,
        configurable: true
    });
    NgAisHighlight.prototype.replaceWithTagName = function (value) {
        return value
            .replace(new RegExp("<em>", "g"), "<" + this.tagName + " class=\"" + this.cx("highlighted") + "\">")
            .replace(new RegExp("</em>", "g"), "</" + this.tagName + ">");
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgAisHighlight.prototype, "attributeName", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NgAisHighlight.prototype, "hit", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgAisHighlight.prototype, "tagName", void 0);
    NgAisHighlight = __decorate([
        core_1.Component({
            selector: "ng-ais-highlight",
            template: "<span [class]=\"cx()\" [innerHtml]=\"content\"></span>"
        })
    ], NgAisHighlight);
    return NgAisHighlight;
}());
exports.NgAisHighlight = NgAisHighlight;


/***/ }),

/***/ 1988:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var connectors_1 = __webpack_require__(28);
var lodash_es_1 = __webpack_require__(30);
var base_widget_1 = __webpack_require__(32);
var instantsearch_1 = __webpack_require__(26);
var NgAisHits = /** @class */ (function (_super) {
    __extends(NgAisHits, _super);
    function NgAisHits(instantSearchParent) {
        var _this = _super.call(this, "Hits") || this;
        _this.instantSearchParent = instantSearchParent;
        // inner widget state returned from connector
        _this.state = { hits: [], results: {} };
        _this.updateState = function (state, isFirstRendering) {
            if (isFirstRendering)
                return;
            _this.state = __assign({}, state, { results: state.results, hits: lodash_es_1.isFunction(_this.transformItems)
                    ? _this.transformItems(state.hits)
                    : state.hits });
        };
        _this.createWidget(connectors_1.connectHits, { escapeHits: true });
        return _this;
    }
    __decorate([
        core_1.ContentChild(core_1.TemplateRef),
        __metadata("design:type", core_1.TemplateRef)
    ], NgAisHits.prototype, "template", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Function)
    ], NgAisHits.prototype, "transformItems", void 0);
    NgAisHits = __decorate([
        core_1.Component({
            selector: "ng-ais-hits",
            template: "\n    <div [class]=\"cx()\">\n      <ng-container *ngTemplateOutlet=\"template; context: state\"></ng-container>\n\n      <!-- default rendering if no template specified -->\n      <div *ngIf=\"!template\">\n        <ul [class]=\"cx('list')\">\n          <li\n            [class]=\"cx('item')\"\n            *ngFor=\"let hit of state.hits\"\n          >\n            <ng-ais-highlight attributeName=\"name\" [hit]=\"hit\">\n            </ng-ais-highlight>\n          </li>\n        </ul>\n      </div>\n    </div>\n  "
        }),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return instantsearch_1.NgAisInstantSearch; }))),
        __metadata("design:paramtypes", [Object])
    ], NgAisHits);
    return NgAisHits;
}(base_widget_1.BaseWidget));
exports.NgAisHits = NgAisHits;


/***/ }),

/***/ 1989:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = __webpack_require__(14);
var core_1 = __webpack_require__(1);
var highlight_module_1 = __webpack_require__(388);
var infinite_hits_1 = __webpack_require__(1990);
var NgAisInfiniteHitsModule = /** @class */ (function () {
    function NgAisInfiniteHitsModule() {
    }
    NgAisInfiniteHitsModule = __decorate([
        core_1.NgModule({
            declarations: [infinite_hits_1.NgAisInfiniteHits],
            entryComponents: [infinite_hits_1.NgAisInfiniteHits],
            exports: [infinite_hits_1.NgAisInfiniteHits],
            imports: [common_1.CommonModule, highlight_module_1.NgAisHighlightModule]
        })
    ], NgAisInfiniteHitsModule);
    return NgAisInfiniteHitsModule;
}());
exports.NgAisInfiniteHitsModule = NgAisInfiniteHitsModule;


/***/ }),

/***/ 1990:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var connectors_1 = __webpack_require__(28);
var lodash_es_1 = __webpack_require__(30);
var base_widget_1 = __webpack_require__(32);
var instantsearch_1 = __webpack_require__(26);
var NgAisInfiniteHits = /** @class */ (function (_super) {
    __extends(NgAisInfiniteHits, _super);
    function NgAisInfiniteHits(instantSearchParent) {
        var _this = _super.call(this, "InfiniteHits") || this;
        _this.instantSearchParent = instantSearchParent;
        // render options
        _this.showMoreLabel = "Show more results";
        // inner widget state returned from connector
        _this.state = {
            hits: [],
            isLastPage: false,
            showMore: lodash_es_1.noop,
            results: {}
        };
        _this.updateState = function (state, isFirstRendering) {
            if (isFirstRendering)
                return;
            _this.state = __assign({}, state, { results: state.results, hits: lodash_es_1.isFunction(_this.transformItems)
                    ? _this.transformItems(state.hits)
                    : state.hits });
        };
        _this.createWidget(connectors_1.connectInfiniteHits, { escapeHits: true });
        return _this;
    }
    NgAisInfiniteHits.prototype.showMore = function (event) {
        event.preventDefault();
        this.state.showMore();
    };
    __decorate([
        core_1.ContentChild(core_1.TemplateRef),
        __metadata("design:type", Object)
    ], NgAisInfiniteHits.prototype, "template", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgAisInfiniteHits.prototype, "showMoreLabel", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Function)
    ], NgAisInfiniteHits.prototype, "transformItems", void 0);
    NgAisInfiniteHits = __decorate([
        core_1.Component({
            selector: "ng-ais-infinite-hits",
            template: "\n    <div [class]=\"cx()\">\n      <ng-container *ngTemplateOutlet=\"template; context: state\"></ng-container>\n\n      <!-- default rendering if no template specified -->\n      <div *ngIf=\"!template\">\n        <ul [class]=\"cx('list')\">\n          <li\n            [class]=\"cx('item')\"\n            *ngFor=\"let hit of state.hits\"\n          >\n            <ng-ais-highlight attributeName=\"name\" [hit]=\"hit\">\n            </ng-ais-highlight>\n          </li>\n        </ul>\n      </div>\n\n      <button\n        [class]=\"cx('showMore')\"\n        (click)=\"showMore($event)\"\n        [disabled]=\"state.isLastPage\"\n        *ngIf=\"!template\"\n      >\n        {{showMoreLabel}}\n      </button>\n    </div>\n  "
        }),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return instantsearch_1.NgAisInstantSearch; }))),
        __metadata("design:paramtypes", [Object])
    ], NgAisInfiniteHits);
    return NgAisInfiniteHits;
}(base_widget_1.BaseWidget));
exports.NgAisInfiniteHits = NgAisInfiniteHits;


/***/ }),

/***/ 1991:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = __webpack_require__(14);
var core_1 = __webpack_require__(1);
var http_1 = __webpack_require__(1992);
var instantsearch_1 = __webpack_require__(26);
var NgAisInstantSearchModule = /** @class */ (function () {
    function NgAisInstantSearchModule() {
    }
    NgAisInstantSearchModule_1 = NgAisInstantSearchModule;
    NgAisInstantSearchModule.forRoot = function () {
        return {
            ngModule: NgAisInstantSearchModule_1,
            providers: []
        };
    };
    NgAisInstantSearchModule = NgAisInstantSearchModule_1 = __decorate([
        core_1.NgModule({
            declarations: [instantsearch_1.NgAisInstantSearch],
            entryComponents: [instantsearch_1.NgAisInstantSearch],
            exports: [instantsearch_1.NgAisInstantSearch],
            imports: [common_1.CommonModule, http_1.HttpClientModule]
        })
    ], NgAisInstantSearchModule);
    return NgAisInstantSearchModule;
    var NgAisInstantSearchModule_1;
}());
exports.NgAisInstantSearchModule = NgAisInstantSearchModule;


/***/ }),

/***/ 2000:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = __webpack_require__(14);
var core_1 = __webpack_require__(1);
var menu_1 = __webpack_require__(2001);
var NgAisMenuModule = /** @class */ (function () {
    function NgAisMenuModule() {
    }
    NgAisMenuModule = __decorate([
        core_1.NgModule({
            declarations: [menu_1.NgAisMenu],
            entryComponents: [menu_1.NgAisMenu],
            exports: [menu_1.NgAisMenu],
            imports: [common_1.CommonModule]
        })
    ], NgAisMenuModule);
    return NgAisMenuModule;
}());
exports.NgAisMenuModule = NgAisMenuModule;


/***/ }),

/***/ 2001:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var connectors_1 = __webpack_require__(28);
var lodash_es_1 = __webpack_require__(30);
var base_widget_1 = __webpack_require__(32);
var instantsearch_1 = __webpack_require__(26);
var utils_1 = __webpack_require__(90);
var NgAisMenu = /** @class */ (function (_super) {
    __extends(NgAisMenu, _super);
    function NgAisMenu(instantSearchParent) {
        var _this = _super.call(this, "Menu") || this;
        _this.instantSearchParent = instantSearchParent;
        // render options
        _this.showMoreLabel = "Show more";
        _this.showLessLabel = "Show less";
        _this.limit = 10;
        _this.state = {
            canRefine: false,
            canToggleShowMore: false,
            createURL: lodash_es_1.noop,
            isShowingMore: false,
            items: [],
            refine: lodash_es_1.noop,
            toggleShowMore: lodash_es_1.noop
        };
        return _this;
    }
    Object.defineProperty(NgAisMenu.prototype, "isHidden", {
        get: function () {
            return this.state.items.length === 0 && this.autoHideContainer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgAisMenu.prototype, "showMoreClass", {
        get: function () {
            var className = this.cx("showMore");
            if (!this.state.canToggleShowMore) {
                className = className + " " + this.cx("showMore", "disabled");
            }
            return className;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgAisMenu.prototype, "items", {
        get: function () {
            return lodash_es_1.isFunction(this.transformItems)
                ? this.transformItems(this.state.items)
                : this.state.items;
        },
        enumerable: true,
        configurable: true
    });
    NgAisMenu.prototype.ngOnInit = function () {
        this.createWidget(connectors_1.connectMenu, {
            limit: utils_1.parseNumberInput(this.limit),
            showMoreLimit: utils_1.parseNumberInput(this.showMoreLimit),
            attributeName: this.attribute,
            sortBy: this.sortBy
        });
        _super.prototype.ngOnInit.call(this);
    };
    NgAisMenu.prototype.handleClick = function (event, value) {
        event.preventDefault();
        event.stopPropagation();
        this.state.refine(value);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgAisMenu.prototype, "showMoreLabel", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgAisMenu.prototype, "showLessLabel", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Function)
    ], NgAisMenu.prototype, "transformItems", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgAisMenu.prototype, "attribute", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NgAisMenu.prototype, "limit", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NgAisMenu.prototype, "showMoreLimit", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NgAisMenu.prototype, "sortBy", void 0);
    NgAisMenu = __decorate([
        core_1.Component({
            selector: "ng-ais-menu",
            template: "\n    <div\n      [class]=\"cx()\"\n      *ngIf=\"!isHidden\"\n    >\n      <ul [class]=\"cx('list')\">\n        <li\n          [class]=\"getItemClass(item)\"\n          *ngFor=\"let item of items\"\n          (click)=\"handleClick($event, item.value)\"\n        >\n          <a\n            href=\"{{state.createURL(item.value)}}\"\n            [class]=\"cx('link')\"\n            (click)=\"handleClick($event, item.value)\"\n          >\n            <span [class]=\"cx('label')\">{{item.label}}</span>\n            <span [class]=\"cx('count')\">{{item.count}}</span>\n          </a>\n        </li>\n      </ul>\n\n      <button\n        *ngIf=\"showMoreLimit && state.canToggleShowMore\"\n        (click)=\"state.toggleShowMore()\"\n        [class]=\"showMoreClass\"\n      >\n        {{state.isShowingMore ? showLessLabel : showMoreLabel}}\n      </button>\n    </div>\n  "
        }),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return instantsearch_1.NgAisInstantSearch; }))),
        __metadata("design:paramtypes", [Object])
    ], NgAisMenu);
    return NgAisMenu;
}(base_widget_1.BaseWidget));
exports.NgAisMenu = NgAisMenu;


/***/ }),

/***/ 2002:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = __webpack_require__(14);
var core_1 = __webpack_require__(1);
var numeric_menu_1 = __webpack_require__(2003);
var NgAisNumericMenuModule = /** @class */ (function () {
    function NgAisNumericMenuModule() {
    }
    NgAisNumericMenuModule = __decorate([
        core_1.NgModule({
            declarations: [numeric_menu_1.NgAisNumericMenu],
            entryComponents: [numeric_menu_1.NgAisNumericMenu],
            exports: [numeric_menu_1.NgAisNumericMenu],
            imports: [common_1.CommonModule]
        })
    ], NgAisNumericMenuModule);
    return NgAisNumericMenuModule;
}());
exports.NgAisNumericMenuModule = NgAisNumericMenuModule;


/***/ }),

/***/ 2003:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var connectors_1 = __webpack_require__(28);
var lodash_es_1 = __webpack_require__(30);
var base_widget_1 = __webpack_require__(32);
var instantsearch_1 = __webpack_require__(26);
var NgAisNumericMenu = /** @class */ (function (_super) {
    __extends(NgAisNumericMenu, _super);
    function NgAisNumericMenu(instantSearchParent) {
        var _this = _super.call(this, "NumericMenu") || this;
        _this.instantSearchParent = instantSearchParent;
        _this.state = {
            createURL: lodash_es_1.noop,
            items: [],
            refine: lodash_es_1.noop
        };
        return _this;
    }
    Object.defineProperty(NgAisNumericMenu.prototype, "isHidden", {
        get: function () {
            return this.state.items.length === 0 && this.autoHideContainer;
        },
        enumerable: true,
        configurable: true
    });
    NgAisNumericMenu.prototype.ngOnInit = function () {
        this.createWidget(connectors_1.connectNumericRefinementList, {
            attributeName: this.attribute,
            options: this.items
        });
        _super.prototype.ngOnInit.call(this);
    };
    NgAisNumericMenu.prototype.refine = function (event, item) {
        event.preventDefault();
        event.stopPropagation();
        this.state.refine(item.value);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgAisNumericMenu.prototype, "attribute", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], NgAisNumericMenu.prototype, "items", void 0);
    NgAisNumericMenu = __decorate([
        core_1.Component({
            selector: "ng-ais-numeric-menu",
            template: "\n    <div\n      [class]=\"cx()\"\n      *ngIf=\"!isHidden\"\n    >\n      <ul [class]=\"cx('list')\">\n        <li\n          [class]=\"getItemClass(item)\"\n          *ngFor=\"let item of state.items\"\n          (click)=\"refine($event, item)\"\n        >\n          <label [class]=\"cx('label')\">\n            <input\n              [class]=\"cx('radio')\"\n              type=\"radio\"\n              name=\"NumericMenu\"\n              [checked]=\"item.isRefined\"\n            />\n            <span [class]=\"cx('labelText')\">{{item.label}}</span>\n          </label>\n        </li>\n      </ul>\n    </div>\n  "
        }),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return instantsearch_1.NgAisInstantSearch; }))),
        __metadata("design:paramtypes", [Object])
    ], NgAisNumericMenu);
    return NgAisNumericMenu;
}(base_widget_1.BaseWidget));
exports.NgAisNumericMenu = NgAisNumericMenu;


/***/ }),

/***/ 2004:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = __webpack_require__(14);
var core_1 = __webpack_require__(1);
var numeric_selector_1 = __webpack_require__(2005);
var NgAisNumericSelectorModule = /** @class */ (function () {
    function NgAisNumericSelectorModule() {
    }
    NgAisNumericSelectorModule = __decorate([
        core_1.NgModule({
            declarations: [numeric_selector_1.NgAisNumericSelector],
            entryComponents: [numeric_selector_1.NgAisNumericSelector],
            exports: [numeric_selector_1.NgAisNumericSelector],
            imports: [common_1.CommonModule]
        })
    ], NgAisNumericSelectorModule);
    return NgAisNumericSelectorModule;
}());
exports.NgAisNumericSelectorModule = NgAisNumericSelectorModule;


/***/ }),

/***/ 2005:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var connectors_1 = __webpack_require__(28);
var lodash_es_1 = __webpack_require__(30);
var base_widget_1 = __webpack_require__(32);
var instantsearch_1 = __webpack_require__(26);
var NgAisNumericSelector = /** @class */ (function (_super) {
    __extends(NgAisNumericSelector, _super);
    function NgAisNumericSelector(instantSearchParent) {
        var _this = _super.call(this, "NumericSelector") || this;
        _this.instantSearchParent = instantSearchParent;
        _this.operator = "=";
        _this.state = {
            currentRefinement: null,
            options: [],
            refine: lodash_es_1.noop
        };
        return _this;
    }
    NgAisNumericSelector.prototype.ngOnInit = function () {
        this.createWidget(connectors_1.connectNumericSelector, {
            attributeName: this.attribute,
            operator: this.operator,
            options: this.items
        });
        _super.prototype.ngOnInit.call(this);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgAisNumericSelector.prototype, "attribute", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgAisNumericSelector.prototype, "operator", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], NgAisNumericSelector.prototype, "items", void 0);
    NgAisNumericSelector = __decorate([
        core_1.Component({
            selector: "ng-ais-numeric-selector",
            template: "\n    <div [class]=\"cx('')\">\n      <select\n        [class]=\"cx('select')\"\n        (change)=\"state.refine($event.target.value)\"\n      >\n        <option\n          [class]=\"cx('option')\"\n          *ngFor=\"let item of state.options\"\n          [value]=\"item.value\"\n          [selected]=\"item.value === state.currentRefinement\"\n        >\n          {{item.label}}\n        </option>\n      </select>\n    </div>\n  "
        }),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return instantsearch_1.NgAisInstantSearch; }))),
        __metadata("design:paramtypes", [Object])
    ], NgAisNumericSelector);
    return NgAisNumericSelector;
}(base_widget_1.BaseWidget));
exports.NgAisNumericSelector = NgAisNumericSelector;


/***/ }),

/***/ 2006:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = __webpack_require__(14);
var core_1 = __webpack_require__(1);
var pagination_1 = __webpack_require__(2007);
var NgAisPaginationModule = /** @class */ (function () {
    function NgAisPaginationModule() {
    }
    NgAisPaginationModule = __decorate([
        core_1.NgModule({
            declarations: [pagination_1.NgAisPagination],
            entryComponents: [pagination_1.NgAisPagination],
            exports: [pagination_1.NgAisPagination],
            imports: [common_1.CommonModule]
        })
    ], NgAisPaginationModule);
    return NgAisPaginationModule;
}());
exports.NgAisPaginationModule = NgAisPaginationModule;


/***/ }),

/***/ 2007:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var connectors_1 = __webpack_require__(28);
var lodash_es_1 = __webpack_require__(30);
var base_widget_1 = __webpack_require__(32);
var instantsearch_1 = __webpack_require__(26);
var utils_1 = __webpack_require__(90);
var NgAisPagination = /** @class */ (function (_super) {
    __extends(NgAisPagination, _super);
    function NgAisPagination(instantSearchParent) {
        var _this = _super.call(this, "Pagination") || this;
        _this.instantSearchParent = instantSearchParent;
        // render options
        _this.showFirst = true;
        _this.showLast = false;
        _this.showPrevious = true;
        _this.showNext = true;
        _this.padding = 3;
        _this.state = {
            createURL: lodash_es_1.noop,
            currentRefinement: 0,
            nbHits: 0,
            nbPages: 0,
            refine: lodash_es_1.noop
        };
        return _this;
    }
    Object.defineProperty(NgAisPagination.prototype, "pages", {
        get: function () {
            var _a = this.state, nbPages = _a.nbPages, currentRefinement = _a.currentRefinement;
            var pagesArray = Array.apply(null, { length: nbPages }).map(Number.call, Number);
            var pagesPadding = typeof this.padding === "string"
                ? parseInt(this.padding, 10)
                : this.padding;
            if (pagesPadding && pagesPadding > 0) {
                // should not display pages that does not exists
                if (nbPages < pagesPadding * 2 + 1) {
                    return pagesArray;
                }
                var minDelta = currentRefinement - pagesPadding - 1;
                var maxDelta = currentRefinement + pagesPadding + 1;
                if (minDelta < 0) {
                    return lodash_es_1.range(0, currentRefinement + pagesPadding + Math.abs(minDelta));
                }
                if (maxDelta > nbPages) {
                    return lodash_es_1.range(currentRefinement - pagesPadding - (maxDelta - nbPages), nbPages);
                }
                return lodash_es_1.range(currentRefinement - pagesPadding, currentRefinement + pagesPadding + 1);
            }
            return pagesArray;
        },
        enumerable: true,
        configurable: true
    });
    NgAisPagination.prototype.ngOnInit = function () {
        this.createWidget(connectors_1.connectPagination, {
            maxPages: utils_1.parseNumberInput(this.totalPages)
        });
        _super.prototype.ngOnInit.call(this);
    };
    NgAisPagination.prototype.refine = function (event, page) {
        event.stopPropagation();
        event.preventDefault();
        if (page <= this.state.nbPages && page >= 0) {
            this.state.refine(page);
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], NgAisPagination.prototype, "showFirst", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], NgAisPagination.prototype, "showLast", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], NgAisPagination.prototype, "showPrevious", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], NgAisPagination.prototype, "showNext", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NgAisPagination.prototype, "padding", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NgAisPagination.prototype, "totalPages", void 0);
    NgAisPagination = __decorate([
        core_1.Component({
            selector: "ng-ais-pagination",
            template: "\n    <div [class]=\"cx()\">\n      <ul [class]=\"cx('list')\">\n        <li\n          *ngIf=\"showFirst\"\n          (click)=\"refine($event, 0)\"\n          [class]=\"\n            cx('item') +\n            ' ' +\n            cx('item', 'firstPage') +\n            (state.currentRefinement === 0 ? ' ' + cx('item', 'disabled') : '')\n          \"\n        >\n          <a\n            [href]=\"state.createURL(0)\"\n            [class]=\"cx('link')\"\n          >\n            \u2039\u2039\n          </a>\n        </li>\n\n        <li\n          *ngIf=\"showPrevious\"\n          (click)=\"refine($event, state.currentRefinement - 1)\"\n          [class]=\"\n            cx('item') +\n            ' ' +\n            cx('item', 'previousPage') +\n            (state.currentRefinement === 0 ? ' ' + cx('item', 'disabled') : '')\n          \"\n        >\n          <a\n            [href]=\"state.createURL(state.currentRefinement - 1)\"\n            [class]=\"cx('link')\"\n          >\n            \u2039\n          </a>\n        </li>\n\n        <li\n          [class]=\"\n            cx('item') +\n            ' ' +\n            cx('item', 'page') +\n            (state.currentRefinement === page ? ' ' + cx('item', 'selected') : '')\n          \"\n          *ngFor=\"let page of pages\"\n          (click)=\"refine($event, page)\"\n        >\n          <a\n            [class]=\"cx('link')\"\n            [href]=\"state.createURL(page)\"\n          >\n            {{page + 1}}\n          </a>\n        </li>\n\n        <li\n          *ngIf=\"showNext\"\n          (click)=\"refine($event, state.currentRefinement + 1)\"\n          [class]=\"\n            cx('item') +\n            ' ' +\n            cx('item', 'nextPage') +\n            (state.currentRefinement + 1 === state.nbPages ? ' ' + cx('item', 'disabled') : '')\n          \"\n        >\n          <a\n            [href]=\"state.createURL(state.currentRefinement + 1)\"\n            [class]=\"cx('link')\"\n          >\n            \u203A\n          </a>\n        </li>\n\n        <li\n          *ngIf=\"showLast\"\n          (click)=\"refine($event, state.nbPages)\"\n          [class]=\"\n            cx('item') +\n            ' ' +\n            cx('item', 'lastPage') +\n            (state.currentRefinement + 1 === state.nbPages ? ' ' + cx('item', 'disabled') : '')\n          \"\n        >\n          <a\n            [href]=\"state.createURL(state.nbPages)\"\n            [class]=\"cx('link')\"\n          >\n            \u203A\u203A\n          </a>\n        </li>\n      </ul>\n    </div>\n  "
        }),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return instantsearch_1.NgAisInstantSearch; }))),
        __metadata("design:paramtypes", [Object])
    ], NgAisPagination);
    return NgAisPagination;
}(base_widget_1.BaseWidget));
exports.NgAisPagination = NgAisPagination;


/***/ }),

/***/ 2008:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = __webpack_require__(14);
var core_1 = __webpack_require__(1);
var range_slider_1 = __webpack_require__(2009);
var NgAisRangeSliderModule = /** @class */ (function () {
    function NgAisRangeSliderModule() {
    }
    NgAisRangeSliderModule = __decorate([
        core_1.NgModule({
            declarations: [range_slider_1.NgAisRangeSlider],
            entryComponents: [range_slider_1.NgAisRangeSlider],
            exports: [range_slider_1.NgAisRangeSlider],
            imports: [common_1.CommonModule]
        })
    ], NgAisRangeSliderModule);
    return NgAisRangeSliderModule;
}());
exports.NgAisRangeSliderModule = NgAisRangeSliderModule;


/***/ }),

/***/ 2009:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var connectors_1 = __webpack_require__(28);
var lodash_es_1 = __webpack_require__(30);
var noUiSlider = __webpack_require__(2010);
var base_widget_1 = __webpack_require__(32);
var instantsearch_1 = __webpack_require__(26);
var utils_1 = __webpack_require__(90);
var NgAisRangeSlider = /** @class */ (function (_super) {
    __extends(NgAisRangeSlider, _super);
    function NgAisRangeSlider(instantSearchParent) {
        var _this = _super.call(this, "RangeSlider") || this;
        _this.instantSearchParent = instantSearchParent;
        // render options
        _this.pips = true;
        _this.tooltips = true;
        _this.precision = 2;
        _this.state = {
            range: { min: 0, max: 1 },
            refine: lodash_es_1.noop,
            start: [0, 1]
        };
        _this.updateState = function (state, isFirstRendering) {
            if (isFirstRendering) {
                // create slider
                var config = {
                    animate: false,
                    behaviour: "snap",
                    connect: true,
                    range: { min: 0, max: 1 },
                    start: [0, 1],
                    step: _this.step,
                    tooltips: _this.tooltips && [
                        { to: _this.formatTooltip },
                        { to: _this.formatTooltip }
                    ]
                };
                if (_this.pips === true || typeof _this.pips === "undefined") {
                    Object.assign(config, {
                        pips: {
                            density: 3,
                            mode: "positions",
                            stepped: true,
                            values: [0, 50, 100]
                        }
                    });
                }
                else if (lodash_es_1.isPlainObject(_this.pips)) {
                    Object.assign(config, { pips: _this.pips });
                }
                _this.slider = noUiSlider.create(_this.sliderContainer.nativeElement, config);
                // register listen events
                _this.sliderContainer.nativeElement.noUiSlider.on("change", _this.handleChange);
            }
            // update component inner state
            _this.state = state;
            // update the slider state
            var _a = state.range, min = _a.min, max = _a.max, start = state.start;
            var disabled = min === max;
            var range = disabled ? { min: min, max: max + 0.0001 } : { min: min, max: max };
            _this.slider.updateOptions({ disabled: disabled, range: range, start: start });
        };
        _this.handleChange = function (values) {
            _this.state.refine(values);
        };
        _this.formatTooltip = function (value) {
            return value.toFixed(utils_1.parseNumberInput(_this.precision));
        };
        return _this;
    }
    Object.defineProperty(NgAisRangeSlider.prototype, "step", {
        get: function () {
            // compute step from the precision value
            var precision = utils_1.parseNumberInput(this.precision) || 2;
            return 1 / Math.pow(10, precision);
        },
        enumerable: true,
        configurable: true
    });
    NgAisRangeSlider.prototype.ngOnInit = function () {
        this.createWidget(connectors_1.connectRange, {
            attributeName: this.attribute,
            max: utils_1.parseNumberInput(this.max),
            min: utils_1.parseNumberInput(this.min),
            precision: utils_1.parseNumberInput(this.precision)
        });
        _super.prototype.ngOnInit.call(this);
    };
    __decorate([
        core_1.ViewChild("sliderContainer"),
        __metadata("design:type", Object)
    ], NgAisRangeSlider.prototype, "sliderContainer", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], NgAisRangeSlider.prototype, "pips", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], NgAisRangeSlider.prototype, "tooltips", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgAisRangeSlider.prototype, "attribute", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NgAisRangeSlider.prototype, "min", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NgAisRangeSlider.prototype, "max", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NgAisRangeSlider.prototype, "precision", void 0);
    NgAisRangeSlider = __decorate([
        core_1.Component({
            selector: "ng-ais-range-slider",
            template: "\n    <div [class]=\"cx()\">\n      <div [class]=\"cx('body')\">\n        <div #sliderContainer></div>\n      </div>\n    </div>\n  "
        }),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return instantsearch_1.NgAisInstantSearch; }))),
        __metadata("design:paramtypes", [Object])
    ], NgAisRangeSlider);
    return NgAisRangeSlider;
}(base_widget_1.BaseWidget));
exports.NgAisRangeSlider = NgAisRangeSlider;


/***/ }),

/***/ 2011:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = __webpack_require__(14);
var core_1 = __webpack_require__(1);
var highlight_module_1 = __webpack_require__(388);
var refinement_list_1 = __webpack_require__(2012);
var facets_search_1 = __webpack_require__(2013);
var NgAisRefinementListModule = /** @class */ (function () {
    function NgAisRefinementListModule() {
    }
    NgAisRefinementListModule = __decorate([
        core_1.NgModule({
            declarations: [refinement_list_1.NgAisRefinementList, facets_search_1.NgAisFacetsSearch],
            entryComponents: [refinement_list_1.NgAisRefinementList],
            exports: [refinement_list_1.NgAisRefinementList],
            imports: [common_1.CommonModule, highlight_module_1.NgAisHighlightModule]
        })
    ], NgAisRefinementListModule);
    return NgAisRefinementListModule;
}());
exports.NgAisRefinementListModule = NgAisRefinementListModule;


/***/ }),

/***/ 2012:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var connectors_1 = __webpack_require__(28);
var lodash_es_1 = __webpack_require__(30);
var base_widget_1 = __webpack_require__(32);
var instantsearch_1 = __webpack_require__(26);
var utils_1 = __webpack_require__(90);
var NgAisRefinementList = /** @class */ (function (_super) {
    __extends(NgAisRefinementList, _super);
    function NgAisRefinementList(instantSearchParent) {
        var _this = _super.call(this, "RefinementList") || this;
        _this.instantSearchParent = instantSearchParent;
        // render options
        _this.showMoreLabel = "Show more";
        _this.showLessLabel = "Show less";
        _this.searchPlaceholder = "Search here...";
        _this.operator = "or";
        _this.limit = 10;
        _this.state = {
            canRefine: false,
            canToggleShowMore: false,
            createURL: lodash_es_1.noop,
            isShowingMore: false,
            items: [],
            refine: lodash_es_1.noop,
            toggleShowMore: lodash_es_1.noop,
            searchForItems: lodash_es_1.noop,
            isFormSearch: false
        };
        return _this;
    }
    Object.defineProperty(NgAisRefinementList.prototype, "isHidden", {
        get: function () {
            return this.state.items.length === 0 && this.autoHideContainer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgAisRefinementList.prototype, "items", {
        get: function () {
            return lodash_es_1.isFunction(this.transformItems)
                ? this.transformItems(this.state.items)
                : this.state.items;
        },
        enumerable: true,
        configurable: true
    });
    NgAisRefinementList.prototype.ngOnInit = function () {
        this.createWidget(connectors_1.connectRefinementList, {
            limit: utils_1.parseNumberInput(this.limit),
            showMoreLimit: utils_1.parseNumberInput(this.showMoreLimit),
            attributeName: this.attribute,
            sortBy: this.sortBy,
            escapeFacetValues: true
        });
        _super.prototype.ngOnInit.call(this);
    };
    NgAisRefinementList.prototype.refine = function (event, item) {
        event.preventDefault();
        event.stopPropagation();
        if (this.state.canRefine) {
            // update UI directly, it will update the checkbox state
            item.isRefined = !item.isRefined;
            // refine through Algolia API
            this.state.refine(item.value);
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgAisRefinementList.prototype, "showMoreLabel", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgAisRefinementList.prototype, "showLessLabel", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Function)
    ], NgAisRefinementList.prototype, "transformItems", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], NgAisRefinementList.prototype, "searchable", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgAisRefinementList.prototype, "searchPlaceholder", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgAisRefinementList.prototype, "attribute", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgAisRefinementList.prototype, "operator", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NgAisRefinementList.prototype, "limit", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NgAisRefinementList.prototype, "showMoreLimit", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NgAisRefinementList.prototype, "sortBy", void 0);
    NgAisRefinementList = __decorate([
        core_1.Component({
            selector: "ng-ais-refinement-list",
            template: "\n    <div\n      [class]=\"cx()\"\n      *ngIf=\"!isHidden\"\n    >\n      <div\n        *ngIf=\"searchable\"\n        [class]=\"cx('searchBox')\"\n      >\n        <ng-ais-facets-search\n          [search]=\"state.searchForItems\"\n          [searchPlaceholder]=\"searchPlaceholder\"\n        >\n        </ng-ais-facets-search>\n      </div>\n\n      <ul [class]=\"cx('list')\">\n        <li\n          [class]=\"getItemClass(item)\"\n          *ngFor=\"let item of items\"\n          (click)=\"refine($event, item)\"\n        >\n          <label [class]=\"cx('label')\">\n            <input\n              [class]=\"cx('checkbox')\"\n              type=\"checkbox\"\n              value=\"{{item.value}}\"\n              [checked]=\"item.isRefined\"\n            />\n            <span [class]=\"cx('labelText')\">\n              <ng-ais-highlight attributeName=\"highlighted\" [hit]=\"item\"></ng-ais-highlight>\n            </span>\n            <span [class]=\"cx('count')\">{{item.count}}</span>\n          </label>\n        </li>\n      </ul>\n\n      <button\n        *ngIf=\"showMoreLimit && state.canToggleShowMore\"\n        (click)=\"state.toggleShowMore()\"\n      >\n        {{state.isShowingMore ? showLessLabel : showMoreLabel}}\n      </button>\n    </div>\n  "
        }),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return instantsearch_1.NgAisInstantSearch; }))),
        __metadata("design:paramtypes", [Object])
    ], NgAisRefinementList);
    return NgAisRefinementList;
}(base_widget_1.BaseWidget));
exports.NgAisRefinementList = NgAisRefinementList;


/***/ }),

/***/ 2013:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var utils_1 = __webpack_require__(90);
var NgAisFacetsSearch = /** @class */ (function () {
    function NgAisFacetsSearch() {
        this.cx = utils_1.bem("SearchBox");
        this.searchQuery = "";
    }
    NgAisFacetsSearch.prototype.handleChange = function (value) {
        this.searchQuery = value;
        this.search(value);
    };
    NgAisFacetsSearch.prototype.handleSubmit = function (event) {
        event.preventDefault();
        this.search(this.searchQuery);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgAisFacetsSearch.prototype, "searchPlaceholder", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Function)
    ], NgAisFacetsSearch.prototype, "search", void 0);
    NgAisFacetsSearch = __decorate([
        core_1.Component({
            selector: "ng-ais-facets-search",
            template: "\n    <div [class]=\"cx()\">\n      <form\n        [class]=\"cx('form')\"\n        (submit)=\"handleSubmit($event)\"\n        novalidate\n      >\n        <input\n          [class]=\"cx('input')\"\n          autocapitalize=\"off\"\n          autocorrect=\"off\"\n          placeholder=\"{{searchPlaceholder}}\"\n          role=\"textbox\"\n          spellcheck=\"false\"\n          type=\"text\"\n          [value]=\"searchQuery\"\n          (input)=\"handleChange($event.target.value)\"\n        />\n\n        <button\n          [class]=\"cx('submit')\"\n          title=\"Submit the search query.\"\n          type=\"submit\"\n        >\n          <svg\n            [ngClass]=\"cx('submitIcon')\"\n            viewBox=\"0 0 40 40\"\n            width=\"10\"\n            height=\"10\"\n          >\n            <path d=\"M26.804 29.01c-2.832 2.34-6.465 3.746-10.426 3.746C7.333 32.756 0 25.424 0 16.378 0 7.333 7.333 0 16.378 0c9.046 0 16.378 7.333 16.378 16.378 0 3.96-1.406 7.594-3.746 10.426l10.534 10.534c.607.607.61 1.59-.004 2.202-.61.61-1.597.61-2.202.004L26.804 29.01zm-10.426.627c7.323 0 13.26-5.936 13.26-13.26 0-7.32-5.937-13.257-13.26-13.257C9.056 3.12 3.12 9.056 3.12 16.378c0 7.323 5.936 13.26 13.258 13.26z\"></path>\n          </svg>\n        </button>\n\n        <button\n          [class]=\"cx('reset')\"\n          type=\"reset\"\n          title=\"Clear the search query.\"\n          hidden\n        >\n          <svg\n            [ngClass]=\"cx('resetIcon')\"\n            viewBox=\"0 0 20 20\"\n            width=\"10\"\n            height=\"10\"\n          >\n            <path d=\"M8.114 10L.944 2.83 0 1.885 1.886 0l.943.943L10 8.113l7.17-7.17.944-.943L20 1.886l-.943.943-7.17 7.17 7.17 7.17.943.944L18.114 20l-.943-.943-7.17-7.17-7.17 7.17-.944.943L0 18.114l.943-.943L8.113 10z\"></path>\n          </svg>\n        </button>\n      </form>\n    </div>\n  "
        })
    ], NgAisFacetsSearch);
    return NgAisFacetsSearch;
}());
exports.NgAisFacetsSearch = NgAisFacetsSearch;


/***/ }),

/***/ 2014:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = __webpack_require__(14);
var core_1 = __webpack_require__(1);
var search_box_1 = __webpack_require__(2015);
var NgAisSearchBoxModule = /** @class */ (function () {
    function NgAisSearchBoxModule() {
    }
    NgAisSearchBoxModule = __decorate([
        core_1.NgModule({
            declarations: [search_box_1.NgAisSearchBox],
            entryComponents: [search_box_1.NgAisSearchBox],
            exports: [search_box_1.NgAisSearchBox],
            imports: [common_1.CommonModule]
        })
    ], NgAisSearchBoxModule);
    return NgAisSearchBoxModule;
}());
exports.NgAisSearchBoxModule = NgAisSearchBoxModule;


/***/ }),

/***/ 2015:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var connectors_1 = __webpack_require__(28);
var lodash_es_1 = __webpack_require__(30);
var base_widget_1 = __webpack_require__(32);
var instantsearch_1 = __webpack_require__(26);
var NgAisSearchBox = /** @class */ (function (_super) {
    __extends(NgAisSearchBox, _super);
    function NgAisSearchBox(instantSearchParent) {
        var _this = _super.call(this, "SearchBox") || this;
        _this.instantSearchParent = instantSearchParent;
        _this.placeholder = "Search";
        _this.submitTitle = "Submit";
        _this.resetTitle = "Reset";
        _this.searchAsYouType = true;
        // Output events
        // form
        _this.submit = new core_1.EventEmitter();
        _this.reset = new core_1.EventEmitter();
        // input
        _this.change = new core_1.EventEmitter();
        _this.focus = new core_1.EventEmitter();
        _this.blur = new core_1.EventEmitter();
        _this.state = {
            query: "",
            refine: lodash_es_1.noop
        };
        _this.createWidget(connectors_1.connectSearchBox);
        return _this;
    }
    NgAisSearchBox.prototype.handleChange = function (query) {
        this.change.emit(query);
        if (this.searchAsYouType) {
            this.state.refine(query);
        }
    };
    NgAisSearchBox.prototype.handleSubmit = function (event) {
        // send submit event to parent component
        this.submit.emit(event);
        event.preventDefault();
        if (!this.searchAsYouType) {
            this.state.refine(this.state.query);
        }
    };
    NgAisSearchBox.prototype.handleReset = function (event) {
        // send reset event to parent component
        this.reset.emit(event);
        // reset search
        this.state.refine("");
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgAisSearchBox.prototype, "placeholder", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgAisSearchBox.prototype, "submitTitle", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgAisSearchBox.prototype, "resetTitle", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], NgAisSearchBox.prototype, "searchAsYouType", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], NgAisSearchBox.prototype, "submit", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], NgAisSearchBox.prototype, "reset", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], NgAisSearchBox.prototype, "change", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], NgAisSearchBox.prototype, "focus", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], NgAisSearchBox.prototype, "blur", void 0);
    NgAisSearchBox = __decorate([
        core_1.Component({
            selector: "ng-ais-search-box",
            template: "\n    <div [class]=\"cx()\">\n      <form\n        [class]=\"cx('form')\"\n        novalidate\n        (submit)=\"handleSubmit($event)\"\n      >\n        <input\n          [class]=\"cx('input')\"\n          autocapitalize=\"off\"\n          autocorrect=\"off\"\n          placeholder=\"{{placeholder}}\"\n          role=\"textbox\"\n          spellcheck=\"false\"\n          type=\"text\"\n          [value]=\"state.query\"\n          (input)=\"handleChange($event.target.value)\"\n          (focus)=\"focus.emit($event)\"\n          (blur)=\"blur.emit($event)\"\n        />\n\n        <button\n          [class]=\"cx('submit')\"\n          type=\"submit\"\n          title=\"{{submitTitle}}\"\n          (click)=\"handleSubmit($event)\"\n        >\n          <svg\n            [ngClass]=\"cx('submitIcon')\"\n            viewBox=\"0 0 40 40\"\n            width=\"40\"\n            height=\"40\"\n          >\n            <path d=\"M26.804 29.01c-2.832 2.34-6.465 3.746-10.426 3.746C7.333 32.756 0 25.424 0 16.378 0 7.333 7.333 0 16.378 0c9.046 0 16.378 7.333 16.378 16.378 0 3.96-1.406 7.594-3.746 10.426l10.534 10.534c.607.607.61 1.59-.004 2.202-.61.61-1.597.61-2.202.004L26.804 29.01zm-10.426.627c7.323 0 13.26-5.936 13.26-13.26 0-7.32-5.937-13.257-13.26-13.257C9.056 3.12 3.12 9.056 3.12 16.378c0 7.323 5.936 13.26 13.258 13.26z\"></path>\n          </svg>\n        </button>\n\n        <button\n          [class]=\"cx('reset')\"\n          type=\"reset\"\n          title=\"{{resetTitle}}\"\n          (click)=\"handleReset($event)\"\n          [hidden]=\"!state.query || (state.query && !state.query.trim())\">\n          <svg\n            [ngClass]=\"cx('resetIcon')\"\n            viewBox=\"0 0 20 20\"\n            width=\"20\"\n            height=\"20\"\n          >\n            <path d=\"M8.114 10L.944 2.83 0 1.885 1.886 0l.943.943L10 8.113l7.17-7.17.944-.943L20 1.886l-.943.943-7.17 7.17 7.17 7.17.943.944L18.114 20l-.943-.943-7.17-7.17-7.17 7.17-.944.943L0 18.114l.943-.943L8.113 10z\"></path>\n          </svg>\n        </button>\n      </form>\n    </div>\n  "
        }),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return instantsearch_1.NgAisInstantSearch; }))),
        __metadata("design:paramtypes", [Object])
    ], NgAisSearchBox);
    return NgAisSearchBox;
}(base_widget_1.BaseWidget));
exports.NgAisSearchBox = NgAisSearchBox;


/***/ }),

/***/ 2016:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = __webpack_require__(14);
var core_1 = __webpack_require__(1);
var sort_by_1 = __webpack_require__(2017);
var NgAisSortByModule = /** @class */ (function () {
    function NgAisSortByModule() {
    }
    NgAisSortByModule = __decorate([
        core_1.NgModule({
            declarations: [sort_by_1.NgAisSortBy],
            entryComponents: [sort_by_1.NgAisSortBy],
            exports: [sort_by_1.NgAisSortBy],
            imports: [common_1.CommonModule]
        })
    ], NgAisSortByModule);
    return NgAisSortByModule;
}());
exports.NgAisSortByModule = NgAisSortByModule;


/***/ }),

/***/ 2017:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var connectors_1 = __webpack_require__(28);
var lodash_es_1 = __webpack_require__(30);
var base_widget_1 = __webpack_require__(32);
var instantsearch_1 = __webpack_require__(26);
var NgAisSortBy = /** @class */ (function (_super) {
    __extends(NgAisSortBy, _super);
    function NgAisSortBy(instantSearchParent) {
        var _this = _super.call(this, "SortBy") || this;
        _this.instantSearchParent = instantSearchParent;
        _this.state = {
            currentRefinement: null,
            options: [],
            refine: lodash_es_1.noop
        };
        return _this;
    }
    NgAisSortBy.prototype.ngOnInit = function () {
        this.createWidget(connectors_1.connectSortBySelector, { indices: this.items });
        _super.prototype.ngOnInit.call(this);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], NgAisSortBy.prototype, "items", void 0);
    NgAisSortBy = __decorate([
        core_1.Component({
            selector: "ng-ais-sort-by",
            template: "\n    <div [class]=\"cx()\">\n      <select\n        [class]=\"cx('select')\"\n        (change)=\"state.refine($event.target.value)\"\n      >\n        <option\n          [class]=\"cx('option')\"\n          *ngFor=\"let item of state.options\"\n          [value]=\"item.value\"\n          [selected]=\"item.value === state.currentRefinement\"\n        >\n          {{item.label}}\n        </option>\n      </select>\n    </div>\n  "
        }),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return instantsearch_1.NgAisInstantSearch; }))),
        __metadata("design:paramtypes", [Object])
    ], NgAisSortBy);
    return NgAisSortBy;
}(base_widget_1.BaseWidget));
exports.NgAisSortBy = NgAisSortBy;


/***/ }),

/***/ 2018:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = __webpack_require__(14);
var core_1 = __webpack_require__(1);
var rating_menu_1 = __webpack_require__(2019);
var NgAisRatingMenuModule = /** @class */ (function () {
    function NgAisRatingMenuModule() {
    }
    NgAisRatingMenuModule = __decorate([
        core_1.NgModule({
            declarations: [rating_menu_1.NgAisRatingMenu],
            entryComponents: [rating_menu_1.NgAisRatingMenu],
            exports: [rating_menu_1.NgAisRatingMenu],
            imports: [common_1.CommonModule]
        })
    ], NgAisRatingMenuModule);
    return NgAisRatingMenuModule;
}());
exports.NgAisRatingMenuModule = NgAisRatingMenuModule;


/***/ }),

/***/ 2019:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var connectors_1 = __webpack_require__(28);
var lodash_es_1 = __webpack_require__(30);
var base_widget_1 = __webpack_require__(32);
var instantsearch_1 = __webpack_require__(26);
var NgAisRatingMenu = /** @class */ (function (_super) {
    __extends(NgAisRatingMenu, _super);
    function NgAisRatingMenu(instantSearchParent) {
        var _this = _super.call(this, "RatingMenu") || this;
        _this.instantSearchParent = instantSearchParent;
        // render options
        _this.andUpLabel = "& Up";
        _this.max = 5;
        _this.state = {
            createURL: lodash_es_1.noop,
            hasNoResults: false,
            items: [],
            refine: lodash_es_1.noop
        };
        return _this;
    }
    Object.defineProperty(NgAisRatingMenu.prototype, "isHidden", {
        get: function () {
            return this.state.items.length === 0 && this.autoHideContainer;
        },
        enumerable: true,
        configurable: true
    });
    NgAisRatingMenu.prototype.ngOnInit = function () {
        this.createWidget(connectors_1.connectStarRating, {
            attributeName: this.attribute,
            max: this.max
        });
        _super.prototype.ngOnInit.call(this);
    };
    NgAisRatingMenu.prototype.handleClick = function (event, value) {
        event.preventDefault();
        event.stopPropagation();
        this.state.refine(value);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgAisRatingMenu.prototype, "andUpLabel", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgAisRatingMenu.prototype, "attribute", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], NgAisRatingMenu.prototype, "max", void 0);
    NgAisRatingMenu = __decorate([
        core_1.Component({
            selector: "ng-ais-rating-menu",
            template: "\n    <div\n      [class]=\"cx()\"\n      *ngIf=\"!isHidden\"\n    >\n      <svg style=\"display:none;\">\n        <symbol\n          id=\"ais-StarRating-starSymbol\"\n          viewBox=\"0 0 24 24\"\n          width=\"24\"\n          height=\"24\"\n        >\n          <path d=\"M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z\"/>\n        </symbol>\n        <symbol\n          id=\"ais-StarRating-starEmptySymbol\"\n          viewBox=\"0 0 24 24\"\n          width=\"24\"\n          height=\"24\"\n        >\n          <path d=\"M12 6.76l1.379 4.246h4.465l-3.612 2.625 1.379 4.246-3.611-2.625-3.612 2.625 1.379-4.246-3.612-2.625h4.465l1.38-4.246zm0-6.472l-2.833 8.718h-9.167l7.416 5.389-2.833 8.718 7.417-5.388 7.416 5.388-2.833-8.718 7.417-5.389h-9.167l-2.833-8.718z\"/>\n        </symbol>\n      </svg>\n\n      <ul [class]=\"cx('list')\">\n        <li\n          *ngFor=\"let item of state.items\"\n          [class]=\"getItemClass(item)\"\n          (click)=\"handleClick($event, item.value)\"\n        >\n          <a\n            href=\"{{state.createURL(item.value)}}\"\n            [class]=\"cx('link')\"\n            (click)=\"handleClick($event, item.value)\"\n          >\n            <svg\n              *ngFor=\"let star of item.stars\"\n              [ngClass]=\"cx('starIcon')\"\n              aria-hidden=\"true\"\n            >\n              <use\n                *ngIf=\"star\"\n                xlink:href=\"#ais-StarRating-starSymbol\"\n              >\n              </use>\n\n              <use\n                *ngIf=\"!star\"\n                xlink:href=\"#ais-StarRating-starEmptySymbol\"\n              >\n              </use>\n            </svg>\n\n            <span [class]=\"cx('label')\" aria-hidden=\"true\">{{andUpLabel}}</span>\n            <span [class]=\"cx('count')\">{{item.count}}</span>\n          </a>\n        </li>\n      </ul>\n    </div>\n  "
        }),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return instantsearch_1.NgAisInstantSearch; }))),
        __metadata("design:paramtypes", [Object])
    ], NgAisRatingMenu);
    return NgAisRatingMenu;
}(base_widget_1.BaseWidget));
exports.NgAisRatingMenu = NgAisRatingMenu;


/***/ }),

/***/ 2020:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = __webpack_require__(14);
var core_1 = __webpack_require__(1);
var stats_1 = __webpack_require__(2021);
var NgAisStatsModule = /** @class */ (function () {
    function NgAisStatsModule() {
    }
    NgAisStatsModule = __decorate([
        core_1.NgModule({
            declarations: [stats_1.NgAisStats],
            entryComponents: [stats_1.NgAisStats],
            exports: [stats_1.NgAisStats],
            imports: [common_1.CommonModule]
        })
    ], NgAisStatsModule);
    return NgAisStatsModule;
}());
exports.NgAisStatsModule = NgAisStatsModule;


/***/ }),

/***/ 2021:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var connectors_1 = __webpack_require__(28);
var base_widget_1 = __webpack_require__(32);
var instantsearch_1 = __webpack_require__(26);
var NgAisStats = /** @class */ (function (_super) {
    __extends(NgAisStats, _super);
    function NgAisStats(instantSearchParent) {
        var _this = _super.call(this, "Stats") || this;
        _this.instantSearchParent = instantSearchParent;
        _this.state = {
            hitPerPage: 0,
            nbHits: 0,
            nbPages: 0,
            page: 0,
            processingTimeMS: 0,
            query: ""
        };
        _this.createWidget(connectors_1.connectStats);
        return _this;
    }
    Object.defineProperty(NgAisStats.prototype, "templateContext", {
        get: function () {
            return { state: this.state };
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.ContentChild(core_1.TemplateRef),
        __metadata("design:type", Object)
    ], NgAisStats.prototype, "template", void 0);
    NgAisStats = __decorate([
        core_1.Component({
            selector: "ng-ais-stats",
            template: "\n    <div [class]=\"cx()\">\n      <ng-container *ngTemplateOutlet=\"template; context: templateContext\">\n      </ng-container>\n\n      <span *ngIf=\"!template\" [class]=\"cx('text')\">\n        {{state.nbHits}} results found in {{state.processingTimeMS}}ms.\n      </span>\n    </div>\n  "
        }),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return instantsearch_1.NgAisInstantSearch; }))),
        __metadata("design:paramtypes", [Object])
    ], NgAisStats);
    return NgAisStats;
}(base_widget_1.BaseWidget));
exports.NgAisStats = NgAisStats;


/***/ }),

/***/ 2022:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = __webpack_require__(14);
var core_1 = __webpack_require__(1);
var toggle_1 = __webpack_require__(2023);
var NgAisToggleModule = /** @class */ (function () {
    function NgAisToggleModule() {
    }
    NgAisToggleModule = __decorate([
        core_1.NgModule({
            declarations: [toggle_1.NgAisToggle],
            entryComponents: [toggle_1.NgAisToggle],
            exports: [toggle_1.NgAisToggle],
            imports: [common_1.CommonModule]
        })
    ], NgAisToggleModule);
    return NgAisToggleModule;
}());
exports.NgAisToggleModule = NgAisToggleModule;


/***/ }),

/***/ 2023:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var connectors_1 = __webpack_require__(28);
var lodash_es_1 = __webpack_require__(30);
var base_widget_1 = __webpack_require__(32);
var instantsearch_1 = __webpack_require__(26);
var NgAisToggle = /** @class */ (function (_super) {
    __extends(NgAisToggle, _super);
    function NgAisToggle(instantSearchParent) {
        var _this = _super.call(this, "ToggleRefinement") || this;
        _this.instantSearchParent = instantSearchParent;
        _this.values = { on: true, off: undefined };
        _this.state = {
            createURL: lodash_es_1.noop,
            refine: lodash_es_1.noop,
            value: {}
        };
        return _this;
    }
    NgAisToggle.prototype.ngOnInit = function () {
        this.createWidget(connectors_1.connectToggle, {
            attributeName: this.attribute,
            label: this.label,
            values: this.values
        });
        _super.prototype.ngOnInit.call(this);
    };
    NgAisToggle.prototype.handleClick = function (event) {
        event.preventDefault();
        event.stopPropagation();
        this.state.refine(this.state.value);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgAisToggle.prototype, "attribute", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgAisToggle.prototype, "label", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NgAisToggle.prototype, "values", void 0);
    NgAisToggle = __decorate([
        core_1.Component({
            selector: "ng-ais-toggle",
            template: "\n    <div [class]=\"cx()\">\n      <ul [class]=\"cx('list')\">\n        <li\n          [class]=\"cx('item')\"\n          (click)=\"handleClick($event)\">\n          <label [class]=\"cx('label')\">\n            <input\n              [class]=\"cx('checkbox')\"\n              type=\"checkbox\"\n              value=\"{{state.value.name}}\"\n              [checked]=\"state.value.isRefined\"\n            />\n\n            <span [class]=\"cx('labelText')\">\n              {{label || state.value.name}}\n            </span>\n\n            <span [class]=\"cx('count')\">{{state.value.count}}</span>\n          </label>\n        </li>\n      </ul>\n    </div>\n  "
        }),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return instantsearch_1.NgAisInstantSearch; }))),
        __metadata("design:paramtypes", [Object])
    ], NgAisToggle);
    return NgAisToggle;
}(base_widget_1.BaseWidget));
exports.NgAisToggle = NgAisToggle;


/***/ }),

/***/ 2024:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = __webpack_require__(14);
var core_1 = __webpack_require__(1);
var range_input_1 = __webpack_require__(2025);
var NgAisRangeInputModule = /** @class */ (function () {
    function NgAisRangeInputModule() {
    }
    NgAisRangeInputModule = __decorate([
        core_1.NgModule({
            declarations: [range_input_1.NgAisRangeInput],
            entryComponents: [range_input_1.NgAisRangeInput],
            exports: [range_input_1.NgAisRangeInput],
            imports: [common_1.CommonModule]
        })
    ], NgAisRangeInputModule);
    return NgAisRangeInputModule;
}());
exports.NgAisRangeInputModule = NgAisRangeInputModule;


/***/ }),

/***/ 2025:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var connectors_1 = __webpack_require__(28);
var lodash_es_1 = __webpack_require__(30);
var base_widget_1 = __webpack_require__(32);
var instantsearch_1 = __webpack_require__(26);
var utils_1 = __webpack_require__(90);
var NgAisRangeInput = /** @class */ (function (_super) {
    __extends(NgAisRangeInput, _super);
    function NgAisRangeInput(instantSearchParent) {
        var _this = _super.call(this, "RangeInput") || this;
        _this.instantSearchParent = instantSearchParent;
        // render options
        _this.currency = "$";
        _this.separator = "to";
        _this.submitLabel = "Go";
        _this.precision = 2;
        // inner state
        _this.minInputValue = "";
        _this.maxInputValue = "";
        _this.state = {
            range: { min: undefined, max: undefined },
            refine: lodash_es_1.noop,
            start: [0, 0]
        };
        return _this;
    }
    Object.defineProperty(NgAisRangeInput.prototype, "step", {
        get: function () {
            var precision = utils_1.parseNumberInput(this.precision) || 2;
            return 1 / Math.pow(10, precision);
        },
        enumerable: true,
        configurable: true
    });
    NgAisRangeInput.prototype.ngOnInit = function () {
        this.createWidget(connectors_1.connectRange, {
            attributeName: this.attributeName,
            max: utils_1.parseNumberInput(this.max),
            min: utils_1.parseNumberInput(this.min),
            precision: utils_1.parseNumberInput(this.precision)
        });
        _super.prototype.ngOnInit.call(this);
    };
    NgAisRangeInput.prototype.handleChange = function (event, type) {
        var value = utils_1.parseNumberInput(event.target.value);
        if (type === "min") {
            this.minInputValue = value;
        }
        else {
            this.maxInputValue = value;
        }
    };
    NgAisRangeInput.prototype.handleSubmit = function (event) {
        event.preventDefault();
        this.state.refine([this.minInputValue, this.maxInputValue]);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgAisRangeInput.prototype, "currency", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgAisRangeInput.prototype, "separator", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgAisRangeInput.prototype, "submitLabel", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgAisRangeInput.prototype, "attributeName", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NgAisRangeInput.prototype, "min", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NgAisRangeInput.prototype, "max", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NgAisRangeInput.prototype, "precision", void 0);
    NgAisRangeInput = __decorate([
        core_1.Component({
            selector: "ng-ais-range-input",
            template: "\n    <div [class]=\"cx()\">\n      <form\n        [class]=\"cx('form')\"\n        (submit)=\"handleSubmit($event)\"\n        novalidate\n      >\n        <label [class]=\"cx('label')\">\n          <span [class]=\"cx('currency')\">{{currency}}</span>\n          <input\n            [class]=\"cx('input', 'min')\"\n            type=\"number\"\n            [min]=\"state.range.min\"\n            [max]=\"state.range.max\"\n            [placeholder]=\"state.range.min\"\n            [value]=\"minInputValue\"\n            [step]=\"step\"\n            (change)=\"handleChange($event, 'min')\"\n          />\n        </label>\n\n        <span [class]=\"cx('separator')\">{{separator}}</span>\n\n        <label [class]=\"cx('label')\">\n          <span [class]=\"cx('currency')\">{{currency}}</span>\n          <input\n            [class]=\"cx('input', 'max')\"\n            type=\"number\"\n            [min]=\"state.range.min\"\n            [max]=\"state.range.max\"\n            [placeholder]=\"state.range.max\"\n            [value]=\"maxInputValue\"\n            [step]=\"step\"\n            (change)=\"handleChange($event, 'max')\"\n          />\n        </label>\n\n        <button\n          [class]=\"cx('submit')\"\n          (click)=\"handleSubmit($event)\"\n        >\n          {{submitLabel}}\n        </button>\n      </form>\n    </div>\n  "
        }),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return instantsearch_1.NgAisInstantSearch; }))),
        __metadata("design:paramtypes", [Object])
    ], NgAisRangeInput);
    return NgAisRangeInput;
}(base_widget_1.BaseWidget));
exports.NgAisRangeInput = NgAisRangeInput;


/***/ }),

/***/ 2026:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = __webpack_require__(14);
var core_1 = __webpack_require__(1);
var panel_1 = __webpack_require__(1059);
var panel_2 = __webpack_require__(1059);
exports.NgAisPanel = panel_2.NgAisPanel;
var NgAisPanelModule = /** @class */ (function () {
    function NgAisPanelModule() {
    }
    NgAisPanelModule = __decorate([
        core_1.NgModule({
            declarations: [panel_1.NgAisPanel],
            entryComponents: [panel_1.NgAisPanel],
            exports: [panel_1.NgAisPanel],
            imports: [common_1.CommonModule]
        })
    ], NgAisPanelModule);
    return NgAisPanelModule;
}());
exports.NgAisPanelModule = NgAisPanelModule;


/***/ }),

/***/ 2027:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var algoliasearchProxy = __webpack_require__(2028);
var encodeProxy = __webpack_require__(772);
var version_1 = __webpack_require__(1058);
// AOT + Rollup workaround
// https://github.com/rollup/rollup/issues/1267#issuecomment-296395734
var algoliasearch = algoliasearchProxy.default || algoliasearchProxy;
var encode = encodeProxy.default || encodeProxy;
function createSSRAlgoliaClient(_a) {
    var httpClient = _a.httpClient, HttpHeaders = _a.HttpHeaders, transferState = _a.transferState, makeStateKey = _a.makeStateKey;
    return function (_, appId, apiKey) {
        var client = algoliasearch(appId, apiKey, {});
        client.addAlgoliaAgent("angular-instantsearch " + version_1.VERSION);
        client._request = function (rawUrl, opts) {
            var headers = new HttpHeaders();
            headers = headers.set("content-type", opts.method === "POST"
                ? "application/x-www-form-urlencoded"
                : "application/json");
            headers = headers.set("accept", "application/json");
            var url = rawUrl + (rawUrl.includes("?") ? "&" : "?") + encode(opts.headers);
            var transferStateKey = makeStateKey("ngais(" + opts.body + ")");
            if (transferState.hasKey(transferStateKey)) {
                var resp = JSON.parse(transferState.get(transferStateKey, {}));
                return Promise.resolve({
                    statusCode: resp.status,
                    body: resp.body,
                    headers: resp.headers
                });
            }
            return new Promise(function (resolve, reject) {
                httpClient
                    .request(opts.method, url, {
                    headers: headers,
                    body: opts.body,
                    observe: "response"
                })
                    .subscribe(function (resp) {
                    transferState.set(transferStateKey, JSON.stringify(resp));
                    resolve({
                        statusCode: resp.status,
                        body: resp.body,
                        headers: resp.headers
                    });
                }, function (resp) {
                    return reject({
                        statusCode: resp.status,
                        body: resp.body,
                        headers: resp.headers
                    });
                });
            });
        };
        return client;
    };
}
exports.createSSRAlgoliaClient = createSSRAlgoliaClient;


/***/ }),

/***/ 2041:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var algoliasearch_helper_1 = __webpack_require__(383);
// Transforms url query to SearchParameters
function parseServerRequest(req) {
    if (req && req.url && req.url.includes("?")) {
        var query = req.url.split("?")[1];
        return algoliasearch_helper_1.AlgoliaSearchHelper.getConfigurationFromQueryString(query);
    }
    return {};
}
exports.parseServerRequest = parseServerRequest;


/***/ }),

/***/ 2042:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var angular_instantsearch_1 = __webpack_require__(921);
var connectors_1 = __webpack_require__(28);
var MenuSelect = /** @class */ (function (_super) {
    __extends(MenuSelect, _super);
    function MenuSelect(instantSearchParent) {
        var _this = _super.call(this, "MenuSelect") || this;
        _this.instantSearchParent = instantSearchParent;
        return _this;
    }
    MenuSelect.prototype.ngOnInit = function () {
        this.createWidget(connectors_1.connectMenu, { attributeName: "categories" });
        _super.prototype.ngOnInit.call(this);
    };
    MenuSelect = __decorate([
        core_1.Component({
            selector: "ng-ais-menu-select",
            template: "\n    <select\n      class=\"menu-select\"\n      (change)=\"state.refine($event.target.value)\"\n    >\n      <option\n        *ngFor=\"let item of state.items\"\n        [value]=\"item.value\"\n        [selected]=\"item.isRefined\"\n      >\n        {{item.label}}\n      </option>\n    </select>\n  "
        }),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return angular_instantsearch_1.NgAisInstantSearch; }))),
        __metadata("design:paramtypes", [Object])
    ], MenuSelect);
    return MenuSelect;
}(angular_instantsearch_1.BaseWidget));
exports.MenuSelect = MenuSelect;


/***/ }),

/***/ 26:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var common_1 = __webpack_require__(14);
var es_1 = __webpack_require__(1880);
var version_1 = __webpack_require__(1058);
var InstantSearchInstance = /** @class */ (function () {
    function InstantSearchInstance() {
    }
    return InstantSearchInstance;
}());
exports.InstantSearchInstance = InstantSearchInstance;
var NgAisInstantSearch = /** @class */ (function () {
    function NgAisInstantSearch(platformId) {
        var _this = this;
        this.platformId = platformId;
        this.instanceName = "default";
        this.change = new core_1.EventEmitter();
        this.onRender = function () {
            _this.change.emit({
                results: _this.instantSearchInstance.helper.lastResults,
                state: _this.instantSearchInstance.helper.state
            });
        };
    }
    NgAisInstantSearch.prototype.ngOnInit = function () {
        this.createInstantSearchInstance(this.config);
    };
    NgAisInstantSearch.prototype.ngAfterViewInit = function () {
        this.instantSearchInstance.start();
    };
    NgAisInstantSearch.prototype.ngOnDestroy = function () {
        this.instantSearchInstance.removeListener("render", this.onRender);
        this.instantSearchInstance.dispose();
    };
    NgAisInstantSearch.prototype.createInstantSearchInstance = function (config) {
        // add default searchParameters with highlighting config
        if (!config.searchParameters)
            config.searchParameters = {};
        Object.assign(config.searchParameters, {
            highlightPreTag: "__ais-highlight__",
            highlightPostTag: "__/ais-highlight__"
        });
        // remove URLSync widget if on SSR
        if (!common_1.isPlatformBrowser(this.platformId)) {
            config.urlSync = false;
        }
        // custom algolia client agent
        if (!config.createAlgoliaClient) {
            config.createAlgoliaClient = function (algoliasearch, appId, apiKey) {
                var client = algoliasearch(appId, apiKey);
                client.addAlgoliaAgent("angular-instantsearch " + version_1.VERSION);
                return client;
            };
        }
        this.instantSearchInstance = es_1.default(config);
        this.instantSearchInstance.on("render", this.onRender);
    };
    NgAisInstantSearch.prototype.addWidget = function (widget) {
        this.instantSearchInstance.addWidget(widget);
    };
    NgAisInstantSearch.prototype.removeWidget = function (widget) {
        this.instantSearchInstance.removeWidget(widget);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NgAisInstantSearch.prototype, "config", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgAisInstantSearch.prototype, "instanceName", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], NgAisInstantSearch.prototype, "change", void 0);
    NgAisInstantSearch = __decorate([
        core_1.Component({
            selector: "ng-ais-instantsearch",
            template: "<ng-content></ng-content>"
        }),
        __param(0, core_1.Inject(core_1.PLATFORM_ID)),
        __metadata("design:paramtypes", [Object])
    ], NgAisInstantSearch);
    return NgAisInstantSearch;
}());
exports.NgAisInstantSearch = NgAisInstantSearch;


/***/ }),

/***/ 32:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var common_1 = __webpack_require__(14);
var lodash_es_1 = __webpack_require__(30);
var utils_1 = __webpack_require__(90);
var Widget = /** @class */ (function () {
    function Widget() {
    }
    return Widget;
}());
exports.Widget = Widget;
var BaseWidget = /** @class */ (function () {
    function BaseWidget(widgetName) {
        var _this = this;
        this.state = {};
        this.updateState = function (state, isFirstRendering) {
            if (isFirstRendering) {
                return Promise.resolve().then(function () {
                    _this.state = state;
                });
            }
            _this.state = state;
        };
        this.cx = utils_1.bem(widgetName);
    }
    BaseWidget.prototype.createWidget = function (connector, options) {
        if (options === void 0) { options = {}; }
        this.widget = connector(this.updateState, lodash_es_1.noop)(options);
    };
    BaseWidget.prototype.ngOnInit = function () {
        // add widget to the InstantSearch Instance
        this.instantSearchParent.addWidget(this.widget);
    };
    BaseWidget.prototype.ngOnDestroy = function () {
        if (common_1.isPlatformBrowser(this.instantSearchParent.platformId)) {
            this.instantSearchParent.removeWidget(this.widget);
        }
    };
    // helper method for genering item list className
    BaseWidget.prototype.getItemClass = function (item) {
        var className = this.cx("item");
        if (item.isRefined) {
            className = className + " " + this.cx("item", "selected");
        }
        return className;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], BaseWidget.prototype, "autoHideContainer", void 0);
    return BaseWidget;
}());
exports.BaseWidget = BaseWidget;


/***/ }),

/***/ 388:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = __webpack_require__(14);
var core_1 = __webpack_require__(1);
var highlight_1 = __webpack_require__(1987);
var NgAisHighlightModule = /** @class */ (function () {
    function NgAisHighlightModule() {
    }
    NgAisHighlightModule = __decorate([
        core_1.NgModule({
            declarations: [highlight_1.NgAisHighlight],
            entryComponents: [highlight_1.NgAisHighlight],
            exports: [highlight_1.NgAisHighlight],
            imports: [common_1.CommonModule]
        })
    ], NgAisHighlightModule);
    return NgAisHighlightModule;
}());
exports.NgAisHighlightModule = NgAisHighlightModule;


/***/ }),

/***/ 818:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 818;

/***/ }),

/***/ 90:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function bem(widgetName) {
    var cx = function (element, subElement) {
        if (element) {
            var scoppedWidgetName = "ais-" + widgetName + "-" + element;
            // output `ais-Widget-Header|Body|Footer ais-Header|Body|Footer`
            if (element === "header" || element === "body" || element === "footer") {
                var nonScoppedWidgetName = "ais-" + element;
                return scoppedWidgetName + " " + nonScoppedWidgetName;
            }
            // output `ais-Widget-Xyz--abc`
            if (subElement) {
                return scoppedWidgetName + "--" + subElement;
            }
            // output `ais-Widget-Xyz`
            return scoppedWidgetName;
        }
        else {
            // output `ais-Widget`
            return "ais-" + widgetName;
        }
    };
    return cx;
}
exports.bem = bem;
function parseNumberInput(input) {
    return typeof input === "string" ? parseInt(input, 10) : input;
}
exports.parseNumberInput = parseNumberInput;


/***/ }),

/***/ 921:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
// Modules
var breadcrumb_module_1 = __webpack_require__(1623);
var clear_refinements_module_1 = __webpack_require__(1977);
var current_refinements_module_1 = __webpack_require__(1979);
var hierarchical_menu_module_1 = __webpack_require__(1981);
var hits_per_page_module_1 = __webpack_require__(1984);
var hits_module_1 = __webpack_require__(1986);
var infinite_hits_module_1 = __webpack_require__(1989);
var instantsearch_module_1 = __webpack_require__(1991);
var menu_module_1 = __webpack_require__(2000);
var numeric_menu_module_1 = __webpack_require__(2002);
var numeric_selector_module_1 = __webpack_require__(2004);
var pagination_module_1 = __webpack_require__(2006);
var range_slider_module_1 = __webpack_require__(2008);
var refinement_list_module_1 = __webpack_require__(2011);
var search_box_module_1 = __webpack_require__(2014);
var sort_by_module_1 = __webpack_require__(2016);
var rating_menu_module_1 = __webpack_require__(2018);
var stats_module_1 = __webpack_require__(2020);
var toggle_module_1 = __webpack_require__(2022);
var highlight_module_1 = __webpack_require__(388);
var range_input_module_1 = __webpack_require__(2024);
var panel_module_1 = __webpack_require__(2026);
// Custom SSR algoliasearchClient
var create_ssr_algolia_client_1 = __webpack_require__(2027);
exports.createSSRAlgoliaClient = create_ssr_algolia_client_1.createSSRAlgoliaClient;
var parse_server_request_1 = __webpack_require__(2041);
exports.parseServerRequest = parse_server_request_1.parseServerRequest;
// Custom widget with BaseWidget class
var base_widget_1 = __webpack_require__(32);
exports.BaseWidget = base_widget_1.BaseWidget;
var instantsearch_1 = __webpack_require__(26);
exports.NgAisInstantSearch = instantsearch_1.NgAisInstantSearch;
var NGIS_MODULES = [
    instantsearch_module_1.NgAisInstantSearchModule,
    hits_module_1.NgAisHitsModule,
    search_box_module_1.NgAisSearchBoxModule,
    clear_refinements_module_1.NgAisClearRefinementsModule,
    menu_module_1.NgAisMenuModule,
    pagination_module_1.NgAisPaginationModule,
    refinement_list_module_1.NgAisRefinementListModule,
    hits_per_page_module_1.NgAisHitsPerPageModule,
    sort_by_module_1.NgAisSortByModule,
    numeric_selector_module_1.NgAisNumericSelectorModule,
    numeric_menu_module_1.NgAisNumericMenuModule,
    stats_module_1.NgAisStatsModule,
    toggle_module_1.NgAisToggleModule,
    infinite_hits_module_1.NgAisInfiniteHitsModule,
    current_refinements_module_1.NgAisCurrentRefinementsModule,
    hierarchical_menu_module_1.NgAisHierarchicalMenuModule,
    rating_menu_module_1.NgAisRatingMenuModule,
    range_slider_module_1.NgAisRangeSliderModule,
    breadcrumb_module_1.NgAisBreadcrumbModule,
    highlight_module_1.NgAisHighlightModule,
    range_input_module_1.NgAisRangeInputModule,
    panel_module_1.NgAisPanelModule
];
var NgAisRootModule = /** @class */ (function () {
    function NgAisRootModule() {
    }
    NgAisRootModule = __decorate([
        core_1.NgModule({
            exports: NGIS_MODULES,
            imports: [instantsearch_module_1.NgAisInstantSearchModule.forRoot()]
        })
    ], NgAisRootModule);
    return NgAisRootModule;
}());
exports.NgAisRootModule = NgAisRootModule;
var NgAisModule = /** @class */ (function () {
    function NgAisModule() {
    }
    NgAisModule.forRoot = function () {
        return { ngModule: NgAisRootModule };
    };
    NgAisModule = __decorate([
        core_1.NgModule({ imports: NGIS_MODULES, exports: NGIS_MODULES })
    ], NgAisModule);
    return NgAisModule;
}());
exports.NgAisModule = NgAisModule;


/***/ })

},[1265]);
//# sourceMappingURL=main.d28099d66e8690b1d05f.js.map