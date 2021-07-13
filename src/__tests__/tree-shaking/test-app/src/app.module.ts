import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import {
  NgAisInstantSearchModule,
  NgAisSearchBoxModule,
  NgAisBreadcrumbModule,
  NgAisRefinementListModule,
} from 'angular-instantsearch';
@Component({
  selector: 'app-root',
  template: `
    <div>
        <h1>Test app</h1>
        <ais-instantsearch>
            <ais-search-box></ais-search-box>
            <ais-breadcrumb [attributes]="['categories.lvl0', 'categories.lvl1']"></ais-breadcrumb>
            <ais-refinement-list attribute="brand"></ais-refinement-list>
        </ais-instantsearch>
    </div>
    `,
})
export class AppComponent {}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NgAisInstantSearchModule.forRoot(),
    NgAisSearchBoxModule,
    NgAisBreadcrumbModule,
    NgAisRefinementListModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
