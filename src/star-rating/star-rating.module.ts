import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NgISFooterModule } from "../footer/footer.module";
import { NgISHeaderModule } from "../header/header.module";
import { NgISStarRating } from "./star-rating";

@NgModule({
  declarations: [NgISStarRating],
  entryComponents: [NgISStarRating],
  exports: [NgISStarRating],
  imports: [CommonModule, NgISHeaderModule, NgISFooterModule]
})
export class NgISStarRatingModule {}
