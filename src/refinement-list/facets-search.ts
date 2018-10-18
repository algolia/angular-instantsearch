import { Component, Input } from '@angular/core';
import { bem } from '../utils';

@Component({
  selector: 'ais-facets-search',
  template: `
    <div [class]="cx()">
      <form
        [class]="cx('form')"
        (submit)="handleSubmit($event)"
        novalidate
      >
        <input
          [class]="cx('input')"
          autocapitalize="off"
          autocorrect="off"
          placeholder="{{searchPlaceholder}}"
          role="textbox"
          spellcheck="false"
          type="text"
          [value]="searchQuery"
          (input)="handleChange($event.target.value)"
        />

        <button
          [class]="cx('submit')"
          title="Submit the search query."
          type="submit"
        >
          <svg
            [ngClass]="cx('submitIcon')"
            viewBox="0 0 40 40"
            width="10"
            height="10"
          >
            <path d="M26.804 29.01c-2.832 2.34-6.465 3.746-10.426 3.746C7.333 32.756 0 25.424 0 16.378 0 7.333 7.333 0 16.378 0c9.046 0 16.378 7.333 16.378 16.378 0 3.96-1.406 7.594-3.746 10.426l10.534 10.534c.607.607.61 1.59-.004 2.202-.61.61-1.597.61-2.202.004L26.804 29.01zm-10.426.627c7.323 0 13.26-5.936 13.26-13.26 0-7.32-5.937-13.257-13.26-13.257C9.056 3.12 3.12 9.056 3.12 16.378c0 7.323 5.936 13.26 13.258 13.26z"></path>
          </svg>
        </button>

        <button
          [class]="cx('reset')"
          type="reset"
          title="Clear the search query."
          hidden
        >
          <svg
            [ngClass]="cx('resetIcon')"
            viewBox="0 0 20 20"
            width="10"
            height="10"
          >
            <path d="M8.114 10L.944 2.83 0 1.885 1.886 0l.943.943L10 8.113l7.17-7.17.944-.943L20 1.886l-.943.943-7.17 7.17 7.17 7.17.943.944L18.114 20l-.943-.943-7.17-7.17-7.17 7.17-.944.943L0 18.114l.943-.943L8.113 10z"></path>
          </svg>
        </button>
      </form>
    </div>
  `,
})
export class NgAisFacetsSearch {
  @Input() public searchPlaceholder: string;
  @Input() public search: Function;

  public cx = bem('SearchBox');

  public searchQuery = '';

  public handleChange(value: string) {
    this.searchQuery = value;
    this.search(value);
  }

  public handleSubmit(event) {
    event.preventDefault();
    this.search(this.searchQuery);
  }
}
