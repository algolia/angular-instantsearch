import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { NgISModule } from "angular-instantsearch";

import { AppComponent } from "./app.component";

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [BrowserModule, NgISModule.forRoot()]
})
export class NgApp {}
