import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NgAisSortBy } from "./sort-by";

@NgModule({
  declarations: [NgAisSortBy],
  entryComponents: [NgAisSortBy],
  exports: [NgAisSortBy],
  imports: [CommonModule]
})
export class NgAisSortByModule {}
