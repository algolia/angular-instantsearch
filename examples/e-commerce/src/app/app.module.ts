import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgAisModule } from "angular-instantsearch";

import { AppComponent } from "./app.component";
import { ProductImageComponent } from "./product-image/product-image.component";

@NgModule({
  declarations: [AppComponent, ProductImageComponent],
  imports: [BrowserModule, NgAisModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
