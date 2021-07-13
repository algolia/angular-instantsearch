import {
  Component,
  Input,
  Inject,
  forwardRef,
  Optional,
  SkipSelf,
} from '@angular/core';
import { Widget, BaseWidget } from '../base-widget';
import { NgAisInstantSearch } from '../instantsearch/instantsearch';
import indexWidget, {
  IndexWidget,
} from 'instantsearch.js/es/widgets/index/index';

const connectIndex = () => indexWidget;

@Component({
  selector: 'ais-index',
  template: `<ng-content></ng-content>`,
})
export class NgAisIndex extends BaseWidget {
  @Input() public indexName: string;
  @Input() public indexId?: string;

  public widget?: IndexWidget;

  constructor(
    // public API does not include SkipSelf, but the index widget should accept parents, avoiding itself.
    @SkipSelf()
    @Inject(forwardRef(() => NgAisIndex))
    @Optional()
    public parentIndex: NgAisIndex,
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchInstance: NgAisInstantSearch
  ) {
    super('Index');
  }

  public addWidgets(widgets: Widget[]) {
    this.widget.addWidgets(widgets);
  }

  public removeWidgets(widgets: Widget[]) {
    this.widget.removeWidgets(widgets);
  }

  ngOnInit() {
    this.createWidget(connectIndex, {
      indexName: this.indexName,
      indexId: this.indexId,
    });
    super.ngOnInit();
  }
}
