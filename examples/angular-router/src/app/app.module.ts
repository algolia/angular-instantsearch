import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NgAisModule } from "angular-instantsearch";

import { AppComponent } from "./app.component";

import { IndexComponent } from "./components/index/index.component";
import { SearchComponent } from "./components/search/search.component";

const appRoutes: Routes = [
  { path: "search", component: SearchComponent },
  { path: "", component: IndexComponent }
];

@NgModule({
  declarations: [AppComponent, IndexComponent, SearchComponent],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    NgAisModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
