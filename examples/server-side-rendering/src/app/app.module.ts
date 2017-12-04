import {
  BrowserModule,
  BrowserTransferStateModule
} from "@angular/platform-browser";

import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { NgAisModule } from "angular-instantsearch";

import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: "my-app" }),
    HttpClientModule,
    BrowserTransferStateModule,
    NgAisModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
