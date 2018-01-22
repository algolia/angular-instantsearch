import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NgAisResultsPerPage } from "./results-per-page";

@NgModule({
  declarations: [NgAisResultsPerPage],
  entryComponents: [NgAisResultsPerPage],
  exports: [NgAisResultsPerPage],
  imports: [CommonModule]
})
export class NgAisResultsPerPageModule {}
