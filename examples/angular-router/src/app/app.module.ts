import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgAisModule } from 'angular-instantsearch';

import { AppComponent } from './app.component';

import { IndexComponent } from './components/index/index.component';
import { SearchDefaultRoutingComponent } from './components/search-default-routing/search-default-routing.component';
import { SearchCustomRoutingComponent } from './components/search-custom-routing/search-custom-routing.component';
import { MenuSelect } from './components/menu-select/menu-select.component';

const appRoutes: Routes = [
  { path: 'search-default-routing', component: SearchDefaultRoutingComponent },
  { path: 'search-custom-routing', component: SearchCustomRoutingComponent },
  { path: '', component: IndexComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    SearchDefaultRoutingComponent,
    SearchCustomRoutingComponent,
    MenuSelect,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    NgAisModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
