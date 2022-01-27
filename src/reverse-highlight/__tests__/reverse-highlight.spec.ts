import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { NgAisReverseHighlightModule } from '../reverse-highlight.module';

const render = ({ hit, attribute, highlightedTagName = 'mark' }) => {
  @Component({
    selector: 'test-component',
    template: `
      <ais-reverse-highlight [attribute]="attribute" [hit]="hit" [highlightedTagName]="highlightedTagName">
      </ais-reverse-highlight>
    `,
  })
  class TestComponent {
    hit = hit;
    attribute: string = attribute;
    highlightedTagName = highlightedTagName;
  }

  TestBed.configureTestingModule({
    declarations: [TestComponent],
    imports: [NgAisReverseHighlightModule],
  });

  const fixture = TestBed.createComponent(TestComponent);
  fixture.detectChanges();

  return fixture;
};

describe('reverse highlight', () => {
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

  it('should highlight with a custom highlightedTagName', () => {
    const fixture = render({
      attribute: 'name',
      hit: {
        _highlightResult: {
          name: { value: '<mark>foo</mark> bar' },
        },
      },
      highlightedTagName: 'em',
    });
    expect(fixture).toMatchSnapshot();
  });
});
