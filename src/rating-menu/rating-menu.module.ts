import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NgAisFooterModule } from "../footer/footer.module";
import { NgAisHeaderModule } from "../header/header.module";
import { NgAisRatingMenu } from "./rating-menu";

@NgModule({
  declarations: [NgAisRatingMenu],
  entryComponents: [NgAisRatingMenu],
  exports: [NgAisRatingMenu],
  imports: [CommonModule, NgAisHeaderModule, NgAisFooterModule]
})
export class NgAisRatingMenuModule {}
