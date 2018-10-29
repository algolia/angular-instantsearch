import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { NgAisModule } from 'angular-instantsearch';

@Component({
  selector: 'app-root',
  template: `<div>Test app heavy</div>`,
})
export class AppComponent {}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgAisModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
