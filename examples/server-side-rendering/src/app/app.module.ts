import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {
  BrowserModule,
  BrowserTransferStateModule,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgAisModule } from 'angular-instantsearch';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserTransferStateModule,
    AppRoutingModule,
    HttpClientModule,
    NgAisModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
