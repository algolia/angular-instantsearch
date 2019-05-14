import { createRenderer } from '../../../helpers/test-renderer';
import { NgAisVoiceSearch } from '../voice-search';

const defaultState = {
  isBrowserSupported: true,
  voiceListeningState: {},
};

const render = createRenderer({
  defaultState,
  template: '<ais-voice-search></ais-voice-search>',
  TestedWidget: NgAisVoiceSearch,
});

describe('VoiceSearch', () => {
  describe('button', () => {
    it('calls toggleListening when button is clicked', () => {
      const toggleListening = jest.fn();
      const fixture = render({
        toggleListening,
      });
      const button = fixture.debugElement.nativeElement.querySelector('button');
      button.click();
      expect(toggleListening).toHaveBeenCalledTimes(1);

      button.click(); // see if still clickable when listening
      expect(toggleListening).toHaveBeenCalledTimes(2);
    });
  });

  describe('Rendering', () => {
    it('renders markup without state', () => {
      const fixture = render();
      expect(fixture).toMatchSnapshot();
    });

    it('button disabled in unsupported browser', () => {
      const fixture = render({
        isBrowserSupported: false,
      });
      const button = fixture.debugElement.nativeElement.querySelector('button');
      expect(button.disabled).toBe(true);
    });

    it('with custom template for buttonText (1)', () => {
      const fixture = createRenderer({
        defaultState,
        template: `
          <ais-voice-search>
            <ng-template #button let-isListening="isListening">
              {{ isListening ? 'Stop' : 'Start' }}
            </ng-template>
          </ais-voice-search>
        `,
        TestedWidget: NgAisVoiceSearch,
      })({
        isListening: true,
      });
      const button = fixture.debugElement.nativeElement.querySelector('button');
      expect(button.textContent.trim()).toBe('Stop');
    });

    it('with custom template for buttonText (2)', () => {
      const fixture = createRenderer({
        defaultState,
        template: `
          <ais-voice-search>
            <ng-template #button let-isListening="isListening">
              {{ isListening ? 'Stop' : 'Start' }}
            </ng-template>
          </ais-voice-search>
        `,
        TestedWidget: NgAisVoiceSearch,
      })({
        isListening: false,
      });
      const button = fixture.debugElement.nativeElement.querySelector('button');
      expect(button.textContent.trim()).toBe('Start');
    });

    it('with custom template for status', () => {
      const fixture = createRenderer({
        defaultState,
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
        TestedWidget: NgAisVoiceSearch,
      })({
        isListening: true,
        voiceListeningState: {
          status: 'recognizing',
          transcript: 'Hello',
          isSpeechFinal: false,
          errorCode: undefined,
        },
      });
      expect(
        fixture.debugElement.nativeElement.querySelector(
          '.ais-VoiceSearch-status'
        )
      ).toMatchSnapshot();
    });
  });
});
