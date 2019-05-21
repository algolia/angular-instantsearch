import { storiesOf } from '@storybook/angular';
import { wrapWithHits } from '../wrap-with-hits';
import meta from '../meta';

storiesOf('VoiceSearch', module)
  .addDecorator(meta)
  .add('default', () => ({
    component: wrapWithHits({
      template: `
        <p>To see this button disabled, test it on unsupported browsers like Safari, Firefox, etc.</p>
        <ais-voice-search></ais-voice-search>
      `,
    }),
  }))
  .add('without status', () => ({
    component: wrapWithHits({
      template: `
        <ais-voice-search>
          <ng-template #status></ng-template>
        </ais-voice-search>
      `,
    }),
  }))
  .add('with a ais-search-box', () => ({
    component: wrapWithHits({
      template: `
        <ais-voice-search></ais-voice-search>
        <ais-search-box></ais-search-box>
      `,
    }),
  }))
  .add('with a custom button text', () => ({
    component: wrapWithHits({
      template: `
        <div class="custom-button">
          <ais-voice-search>
            <ng-template #button let-isListening="isListening">
              {{isListening ? '⏹' : '🎙'}}
            </ng-template>
          </ais-voice-search>
        </div>
      `,
    }),
  }))
  .add('with full status', () => ({
    component: wrapWithHits({
      template: `
        <ais-voice-search>
          <ng-template #status let-status="status"
                               let-errorCode="errorCode"
                               let-isListening="isListening"
                               let-transcript="transcript"
                               let-isSpeechFinal="isSpeechFinal"
                               let-isBrowserSupported="isBrowserSupported">
            <p>status: {{status}}</p>
            <p>errorCode: {{errorCode}}</p>
            <p>isListening: {{isListening}}</p>
            <p>transcript: {{transcript}}</p>
            <p>isSpeechFinal: {{isSpeechFinal}}</p>
            <p>isBrowserSupported: {{isBrowserSupported}}</p>
          </ng-template>
        </ais-voice-search>
      `,
    }),
  }))
  .add('with custom button title', () => ({
    component: wrapWithHits({
      template: `
        <ais-voice-search
          buttonTitle="Voice Search"
          disabledButtonTitle="Disabled. Chrome Only."
        >
        </ais-voice-search>
      `,
    }),
  }))
  .add('search as you speak', () => ({
    component: wrapWithHits({
      template: `
        <ais-voice-search
          [searchAsYouSpeak]="true"
        >
          <ng-template #status let-status="status"
                               let-errorCode="errorCode"
                               let-isListening="isListening"
                               let-transcript="transcript"
                               let-isSpeechFinal="isSpeechFinal"
                               let-isBrowserSupported="isBrowserSupported">
            <p>status: {{status}}</p>
            <p>errorCode: {{errorCode}}</p>
            <p>isListening: {{isListening}}</p>
            <p>transcript: {{transcript}}</p>
            <p>isSpeechFinal: {{isSpeechFinal}}</p>
            <p>isBrowserSupported: {{isBrowserSupported}}</p>
          </ng-template>
        </ais-voice-search>
      `,
    }),
  }))
  .add('example of dynamic UI working with SearchBox', () => ({
    component: wrapWithHits({
      template: `
        <div class="custom-ui">
          <ais-voice-search>
            <ng-template #status let-isListening="isListening"
                                 let-transcript="transcript">
              <div [className]="'layer listening-' + isListening">
                <span>{{transcript ? transcript : ''}}</span>
              </div>
            </ng-template>
          </ais-voice-search>
          <ais-search-box></ais-search-box>
        </div>
      `,
    }),
  }));
