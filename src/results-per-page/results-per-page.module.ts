import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NgAisFooterModule } from "../footer/footer.module";
import { NgAisHeaderModule } from "../header/header.module";
import { NgAisResultsPerPage } from "./results-per-page";

@NgModule({
  declarations: [NgAisResultsPerPage],
  entryComponents: [NgAisResultsPerPage],
  exports: [NgAisResultsPerPage],
  imports: [CommonModule, NgAisHeaderModule, NgAisFooterModule]
})
export class NgAisResultsPerPageModule {}
