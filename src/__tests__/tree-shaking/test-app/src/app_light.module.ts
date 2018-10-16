import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import {
  NgAisHitsModule,
  NgAisInstantSearchModule,
  NgAisSearchBoxModule,
} from 'angular-instantsearch';

@Component({
  selector: 'app-root',
  template: `<div>Test app light</div>`,
})
export class AppComponent {}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NgAisInstantSearchModule.forRoot(),
    NgAisHitsModule,
    NgAisSearchBoxModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
