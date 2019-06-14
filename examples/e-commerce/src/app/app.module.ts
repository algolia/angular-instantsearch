import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgAisModule } from 'angular-instantsearch';

import { AppComponent } from './app.component';
import { ProductImageComponent } from './product-image/product-image.component';
import { PriceSlider } from './price-slider/price-slider.component';
import { RatingMenu } from './rating-menu/rating-menu.component';
import { Snippet } from './snippet/snippet.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductImageComponent,
    PriceSlider,
    RatingMenu,
    Snippet,
  ],
  imports: [BrowserModule, NgAisModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
