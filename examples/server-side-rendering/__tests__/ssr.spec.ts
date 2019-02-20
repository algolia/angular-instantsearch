import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';

describe('SSR', () => {
  describe('with no state', () => {
    let dom;
    beforeAll(async () => {
      const res = await fetch('http://localhost:4000/');
      const html = await res.text();
      dom = new JSDOM(html);
    });
    it('should return html with a searchbox', async () => {
      const searchBox = dom.window.document.querySelector('ais-search-box');
      expect(searchBox).toBeDefined();
    });
    it('should return html with a refinement list', async () => {
      const refinementList = dom.window.document.querySelector(
        'ais-refinement-list'
      );
      expect(refinementList).toBeDefined();
    });
    it('should return page 1', async () => {
      const pageSelected = dom.window.document.querySelector(
        '.ais-Pagination-item--selected'
      );
      expect(pageSelected.textContent.trim()).toEqual('1');
    });
  });

  describe('with state', () => {
    let dom;
    beforeAll(async () => {
      const res = await fetch('http://localhost:4000/?p=2');
      const html = await res.text();
      dom = new JSDOM(html);
    });
    it('should return html on page 3', async () => {
      const pageSelected = dom.window.document.querySelector(
        '.ais-Pagination-item--selected'
      );
      expect(pageSelected.textContent.trim()).toEqual('3');
    });
  });
});
