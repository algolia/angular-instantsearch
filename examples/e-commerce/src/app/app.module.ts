import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgAisModule } from 'angular-instantsearch';

import { AppComponent } from './app.component';
import { RatingMenu } from './rating-menu/rating-menu.component';
import { Snippet } from './snippet/snippet.component';
import { ResetFiltersMobile } from './reset-filters-mobile/reset-filters-mobile.component';
import { NoResults } from './no-results/no-results.component';

@NgModule({
  declarations: [
    AppComponent,
    RatingMenu,
    Snippet,
    ResetFiltersMobile,
    NoResults,
  ],
  imports: [BrowserModule, NgAisModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
