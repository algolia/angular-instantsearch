import { Component } from "@angular/core";
import { TestBed } from "@angular/core/testing";

import { NgAisHighlightModule } from "../highlight.module";

const render = ({ hit, attribute, tagName = "em" }) => {
  @Component({
    selector: "test-component",
    template: `
      <ais-highlight [attribute]="attribute" [hit]="hit">
      </ais-highlight>
    `
  })
  class TestComponent {
    hit = hit;
    attribute: string = attribute;
    tagName = tagName;
  }

  TestBed.configureTestingModule({
    declarations: [TestComponent],
    imports: [NgAisHighlightModule]
  });

  const fixture = TestBed.createComponent(TestComponent);
  fixture.detectChanges();

  return fixture;
};

describe("highlight", () => {
  it("should highlight strings", () => {
    const fixture = render({
      attribute: "name",
      hit: {
        _highlightResult: {
          name: { value: "<em>foo</em> bar" }
        }
      }
    });
    expect(fixture).toMatchSnapshot();
  });

  it("should highlight nested objects", () => {
    const fixture = render({
      attribute: "parent.name",
      hit: {
        _highlightResult: {
          parent: {
            name: { value: "<em>foo</em> bar" }
          }
        }
      }
    });
    expect(fixture).toMatchSnapshot();
  });

  it("should highlight values in array", () => {
    const fixture = render({
      attribute: "children[0].name",
      hit: {
        _highlightResult: {
          children: [
            {
              name: { value: "<em>foo</em> bar" }
            }
          ]
        }
      }
    });
    expect(fixture).toMatchSnapshot();
  });

  it("should warn when attribute is not found", () => {
    const spy = jest.spyOn(global.console, "warn");
    spy.mockImplementation(() => {});

    const fixture = render({
      attribute: "invalid",
      hit: {
        _highlightResult: {
          name: { value: "<em>foo</em> bar" }
        }
      }
    });
    expect(spy).toHaveBeenCalled();
    expect(fixture).toMatchSnapshot();

    spy.mockReset();
    spy.mockRestore();
  });

  it("should fallback to non highlighted when no match", () => {
    const fixture = render({
      attribute: "name",
      hit: { name: "foo bar" }
    });
    expect(fixture).toMatchSnapshot();
  });

  it("should use `hit.highlighted` if it exists", () => {
    const fixture = render({
      attribute: "highlighted",
      hit: { highlighted: "<em>foo</em> bar" }
    });
    expect(fixture).toMatchSnapshot();
  });
});
