import {
  BrowserModule,
  BrowserTransferStateModule
} from "@angular/platform-browser";

import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { PrebootModule } from "preboot";

import { NgAisModule } from "angular-instantsearch";

import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: "my-app" }),
    PrebootModule.withConfig({ appRoot: "app-root" }),
    HttpClientModule,
    BrowserTransferStateModule,
    NgAisModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
