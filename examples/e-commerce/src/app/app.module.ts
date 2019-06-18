import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgAisModule } from 'angular-instantsearch';

import { AppComponent } from './app.component';
import { RatingMenu } from './rating-menu/rating-menu.component';
import { Snippet } from './snippet/snippet.component';

@NgModule({
  declarations: [AppComponent, RatingMenu, Snippet],
  imports: [BrowserModule, NgAisModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
