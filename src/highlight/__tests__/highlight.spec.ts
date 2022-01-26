import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { NgAisHighlightModule } from '../highlight.module';

const render = ({ hit, attribute, tagName = 'mark' }) => {
  @Component({
    selector: 'test-component',
    template: `
      <ais-highlight [attribute]="attribute" [hit]="hit" [tagName]="tagName">
      </ais-highlight>
    `,
  })
  class TestComponent {
    hit = hit;
    attribute: string = attribute;
    tagName = tagName;
  }

  TestBed.configureTestingModule({
    declarations: [TestComponent],
    imports: [NgAisHighlightModule],
  });

  const fixture = TestBed.createComponent(TestComponent);
  fixture.detectChanges();

  return fixture;
};

describe('highlight', () => {
  it('should highlight strings', () => {
    const fixture = render({
      attribute: 'name',
      hit: {
        _highlightResult: {
          name: { value: '<mark>foo</mark> bar' },
        },
      },
    });
    expect(fixture).toMatchSnapshot();
  });

  it('should highlight nested objects', () => {
    const fixture = render({
      attribute: 'parent.name',
      hit: {
        _highlightResult: {
          parent: {
            name: { value: '<mark>foo</mark> bar' },
          },
        },
      },
    });
    expect(fixture).toMatchSnapshot();
  });

  it('should highlight with a custom tagName', () => {
    const fixture = render({
      attribute: 'name',
      hit: {
        _highlightResult: {
          name: { value: '<mark>foo</mark> bar' },
        },
      },
      tagName: 'em',
    });
    expect(fixture).toMatchSnapshot();
  });

  it('should fallback to non highlighted when no match', () => {
    const fixture = render({
      attribute: 'name',
      hit: { name: 'foo bar' },
    });
    expect(fixture).toMatchSnapshot();
  });
});
