import {
  Component,
  Input,
  Inject,
  forwardRef,
  NgZone,
  ContentChild,
  ElementRef,
  TemplateRef,
  OnInit,
} from '@angular/core';

import { connectVoiceSearch } from 'instantsearch.js/es/connectors';
import { BaseWidget } from '../base-widget';
import { NgAisInstantSearch } from '../instantsearch/instantsearch';
import { noop } from '../utils';

type Status =
  | 'initial'
  | 'askingPermission'
  | 'waiting'
  | 'recognizing'
  | 'finished'
  | 'error';

type ErrorCode =
  | 'no-speech'
  | 'aborted'
  | 'audio-capture'
  | 'network'
  | 'not-allowed'
  | 'service-not-allowed'
  | 'bad-grammar'
  | 'language-not-supported';

type TemplateContext = {
  status: Status;
  transcript: string;
  isSpeechFinal: boolean;
  errorCode?: ErrorCode;
  isBrowserSupported: boolean;
  isListening: boolean;
};

type VoiceListeningState = {
  status: Status;
  transcript: string;
  isSpeechFinal: boolean;
  errorCode?: ErrorCode;
};

type State = {
  isBrowserSupported: boolean;
  isListening: boolean;
  toggleListening: () => void;
  voiceListeningState: VoiceListeningState;
  templateContext: TemplateContext;
};

@Component({
  selector: 'ais-voice-search',
  template: `
    <div [class]="cx()">
      <button
        type="button"
        [class]="cx('button')"
        [title]="state.isBrowserSupported ? buttonTitle : disabledButtonTitle"
        [disabled]="!state.isBrowserSupported"
        (click)="handleClick($event)"
      >
        <ng-container *ngTemplateOutlet="button ? button : defaultButton; context: state.templateContext"></ng-container>
      </button>
      <div [class]="cx('status')">
        <ng-container *ngTemplateOutlet="status ? status : defaultStatus; context: state.templateContext"></ng-container>
      </div>
    </div>

    <ng-template #defaultButton let-status="status" let-errorCode="errorCode" let-isListening="isListening">
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='16'
        height='16'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <ng-container *ngIf="isNotAllowedError(); then errorSvgContent else normalSvgContent">
        </ng-container>
        <ng-template #errorSvgContent>
          <line x1="1" y1="1" x2="23" y2="23"></line>
          <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path>
          <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path>
          <line x1="12" y1="19" x2="12" y2="23"></line>
          <line x1="8" y1="23" x2="16" y2="23"></line>
        </ng-template>
        <ng-template #normalSvgContent>
          <path
            d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"
            [attr.fill]="isListening ? 'currentColor' : 'none'"
          ></path>
          <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
          <line x1="12" y1="19" x2="12" y2="23"></line>
          <line x1="8" y1="23" x2="16" y2="23"></line>
        </ng-template>
      </svg>
    </ng-template>
    <ng-template #defaultStatus let-transcript="transcript">
      <p>{{transcript}}</p>
    </ng-template>
  `,
})
export class NgAisVoiceSearch extends BaseWidget implements OnInit {
  @ContentChild('button') button: TemplateRef<ElementRef>;
  @ContentChild('status') status: TemplateRef<ElementRef>;

  @Input() public searchAsYouSpeak?: boolean;
  @Input() public buttonTitle: string = 'Search by voice';
  @Input()
  public disabledButtonTitle: string =
    'Search by voice (not supported on this browser)';

  public state: State = {
    isBrowserSupported: undefined,
    isListening: undefined,
    toggleListening: noop,
    voiceListeningState: {
      status: 'initial',
      transcript: '',
      isSpeechFinal: false,
      errorCode: undefined,
    },
    templateContext: {
      status: 'initial',
      errorCode: undefined,
      transcript: '',
      isSpeechFinal: false,
      isListening: false,
      isBrowserSupported: false,
    },
  };

  constructor(
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchParent: any,
    private zone: NgZone
  ) {
    super('VoiceSearch');
  }

  ngOnInit() {
    this.createWidget(connectVoiceSearch, {
      searchAsYouSpeak: this.searchAsYouSpeak,
    });
    super.ngOnInit();
  }

  public handleClick = (event: MouseEvent): void => {
    (event.currentTarget as HTMLElement).blur();
    this.state.toggleListening();
  };

  public isNotAllowedError = (): boolean =>
    this.state.voiceListeningState.status === 'error' &&
    this.state.voiceListeningState.errorCode === 'not-allowed';

  public updateState = (state: State): void => {
    this.zone.run(() => {
      this.state = {
        ...state,
        templateContext: {
          status: state.voiceListeningState.status,
          errorCode: state.voiceListeningState.errorCode,
          transcript: state.voiceListeningState.transcript,
          isSpeechFinal: state.voiceListeningState.isSpeechFinal,
          isListening: state.isListening,
          isBrowserSupported: state.isBrowserSupported,
        },
      };
    });
  };
}
