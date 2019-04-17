import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgAisQueryRuleContext } from './query-rule-context';

@NgModule({
  declarations: [NgAisQueryRuleContext],
  entryComponents: [NgAisQueryRuleContext],
  exports: [NgAisQueryRuleContext],
  imports: [CommonModule],
})
export class NgAisQueryRuleContextModule {}
