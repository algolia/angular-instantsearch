import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { NgAisSnippetModule } from '../snippet.module';

const render = ({ hit, attribute, highlightedTagName = 'mark' }) => {
  @Component({
    selector: 'test-component',
    template: `
      <ais-snippet [attribute]="attribute" [hit]="hit" [highlightedTagName]="highlightedTagName">
      </ais-snippet>
    `,
  })
  class TestComponent {
    hit = hit;
    attribute: string = attribute;
    highlightedTagName = highlightedTagName;
  }

  TestBed.configureTestingModule({
    declarations: [TestComponent],
    imports: [NgAisSnippetModule],
  });

  const fixture = TestBed.createComponent(TestComponent);
  fixture.detectChanges();

  return fixture;
};

describe('highlight', () => {
  it('should snippet strings', () => {
    const fixture = render({
      attribute: 'description',
      hit: {
        _snippetResult: {
          description: { value: '… <mark>foo</mark> bar …' },
        },
      },
    });
    expect(fixture).toMatchSnapshot();
  });

  it('should snippet with a custom highlightedTagName', () => {
    const fixture = render({
      attribute: 'description',
      hit: {
        _snippetResult: {
          description: { value: '… <mark>foo</mark> bar …' },
        },
      },
      highlightedTagName: 'em',
    });
    expect(fixture).toMatchSnapshot();
  });
});
