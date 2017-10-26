import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NgAisFooterModule } from "../footer/footer.module";
import { NgAisHeaderModule } from "../header/header.module";
import { NgAisStarRating } from "./star-rating";

@NgModule({
  declarations: [NgAisStarRating],
  entryComponents: [NgAisStarRating],
  exports: [NgAisStarRating],
  imports: [CommonModule, NgAisHeaderModule, NgAisFooterModule]
})
export class NgAisStarRatingModule {}
