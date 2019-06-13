import { bem } from '../utils';

describe('Utils', () => {
  const cx = bem('testWidget');

  describe('bem', () => {
    it('generates className for root', () => {
      expect(cx()).toBe('ais-testWidget');
    });

    it('generates className for an element', () => {
      expect(cx('input')).toBe('ais-testWidget-input');
    });

    it('generates className for header, body and footer', () => {
      expect(cx('header')).toBe('ais-testWidget-header ais-header');
      expect(cx('body')).toBe('ais-testWidget-body ais-body');
      expect(cx('footer')).toBe('ais-testWidget-footer ais-footer');
    });

    it('generates className for subElement', () => {
      expect(cx('input', 'min')).toBe('ais-testWidget-input--min');
    });
  });
});
