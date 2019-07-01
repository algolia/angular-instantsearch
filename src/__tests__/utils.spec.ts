import { bem } from '../utils';

describe('Utils', () => {
  const cx = bem('testWidget');

  describe('bem', () => {
    it('generates className for root', () => {
      expect(cx()).toBe('ais-testWidget');
      expect(cx('')).toBe('ais-testWidget');
    });

    it('generates className for an element', () => {
      expect(cx('input')).toBe('ais-testWidget-input');
    });

    it('generates className for subElement', () => {
      expect(cx('input', 'min')).toBe('ais-testWidget-input--min');
      expect(cx('', 'min')).toBe('ais-testWidget--min');
    });
  });
});
