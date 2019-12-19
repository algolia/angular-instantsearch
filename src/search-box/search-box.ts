import {
  Component,
  Input,
  Output,
  EventEmitter,
  Inject,
  forwardRef,
  ViewChild,
  AfterViewInit,
  ElementRef,
} from '@angular/core';

import { connectSearchBox } from 'instantsearch.js/es/connectors';
import { BaseWidget } from '../base-widget';
import { NgAisInstantSearch } from '../instantsearch/instantsearch';
import { noop } from '../utils';

@Component({
  selector: 'ais-search-box',
  template: `
    <div [class]="cx()">
      <form
        [class]="cx('form')"
        novalidate
        (submit)="handleSubmit($event)"
      >
        <input
          [class]="cx('input')"
          autocapitalize="off"
          autocorrect="off"
          placeholder="{{placeholder}}"
          role="textbox"
          spellcheck="false"
          type="text"
          [value]="state.query"
          (input)="handleChange($event.target.value)"
          (focus)="focus.emit($event)"
          (blur)="blur.emit($event)"
          #searchBox
        />

        <button
          [class]="cx('submit')"
          type="submit"
          title="{{submitTitle}}"
        >
          <svg
            [ngClass]="cx('submitIcon')"
            viewBox="0 0 40 40"
            width="40"
            height="40"
          >
            <path d="M26.804 29.01c-2.832 2.34-6.465 3.746-10.426 3.746C7.333 32.756 0 25.424 0 16.378 0 7.333 7.333 0 16.378 0c9.046 0 16.378 7.333 16.378 16.378 0 3.96-1.406 7.594-3.746 10.426l10.534 10.534c.607.607.61 1.59-.004 2.202-.61.61-1.597.61-2.202.004L26.804 29.01zm-10.426.627c7.323 0 13.26-5.936 13.26-13.26 0-7.32-5.937-13.257-13.26-13.257C9.056 3.12 3.12 9.056 3.12 16.378c0 7.323 5.936 13.26 13.258 13.26z"></path>
          </svg>
        </button>

        <button
          [class]="cx('reset')"
          type="reset"
          title="{{resetTitle}}"
          (click)="handleReset($event)"
          [hidden]="!state.query || (state.query && !state.query.trim())">
          <svg
            [ngClass]="cx('resetIcon')"
            viewBox="0 0 20 20"
            width="20"
            height="20"
          >
            <path d="M8.114 10L.944 2.83 0 1.885 1.886 0l.943.943L10 8.113l7.17-7.17.944-.943L20 1.886l-.943.943-7.17 7.17 7.17 7.17.943.944L18.114 20l-.943-.943-7.17-7.17-7.17 7.17-.944.943L0 18.114l.943-.943L8.113 10z"></path>
          </svg>
        </button>
      </form>
    </div>
  `,
})
export class NgAisSearchBox extends BaseWidget implements AfterViewInit {
  @ViewChild('searchBox') searchBox: ElementRef;
  @Input() public placeholder: string = 'Search';
  @Input() public submitTitle: string = 'Submit';
  @Input() public resetTitle: string = 'Reset';
  @Input() public searchAsYouType: boolean = true;
  @Input() public autofocus: boolean = false;

  // Output events
  // form
  @Output() submit = new EventEmitter();
  @Output() reset = new EventEmitter();

  // input
  @Output() change = new EventEmitter();
  @Output() focus = new EventEmitter();
  @Output() blur = new EventEmitter();

  public state = {
    query: '',
    refine: noop,
  };

  constructor(
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchParent: NgAisInstantSearch
  ) {
    super('SearchBox');
    this.createWidget(connectSearchBox);
  }

  public ngAfterViewInit() {
    if (this.autofocus) {
      this.searchBox.nativeElement.focus();
    }
  }

  public handleChange(query: string) {
    this.change.emit(query);
    if (this.searchAsYouType) {
      this.state.refine(query);
    }
  }

  public handleSubmit(event: Event) {
    // send submit event to parent component
    this.submit.emit(event);

    event.preventDefault();

    if (!this.searchAsYouType) {
      this.state.refine(this.searchBox.nativeElement.value);
    }
  }

  public handleReset(event: MouseEvent) {
    // send reset event to parent component
    this.reset.emit(event);

    // reset search
    this.state.refine('');
  }
}
