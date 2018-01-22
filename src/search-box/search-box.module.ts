import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NgAisSearchBox } from "./search-box";

@NgModule({
  declarations: [NgAisSearchBox],
  entryComponents: [NgAisSearchBox],
  exports: [NgAisSearchBox],
  imports: [CommonModule]
})
export class NgAisSearchBoxModule {}
