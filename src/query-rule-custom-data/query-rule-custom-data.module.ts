import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgAisQueryRuleCustomData } from './query-rule-custom-data';

@NgModule({
  declarations: [NgAisQueryRuleCustomData],
  entryComponents: [NgAisQueryRuleCustomData],
  exports: [NgAisQueryRuleCustomData],
  imports: [CommonModule],
})
export class NgAisQueryRuleCustomDataModule {}
