import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { NgAisModule } from "angular-instantsearch";

import { AppComponent } from "./app.component";

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [BrowserModule, NgAisModule.forRoot()],
  providers: []
})
export class NgApp {}
