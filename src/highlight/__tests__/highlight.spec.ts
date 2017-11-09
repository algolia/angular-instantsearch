import { Component } from "@angular/core";
import { TestBed } from "@angular/core/testing";

import { NgAisHighlightModule } from "../highlight.module";

const render = ({ hit, attributeName, tagName = "em" }) => {
  @Component({
    selector: "test-component",
    template: `
      <ng-ais-highlight [attributeName]="attributeName" [hit]="hit">
      </ng-ais-highlight>
    `
  })
  class TestComponent {
    hit = hit;
    attributeName: string = attributeName;
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
      attributeName: "name",
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
      attributeName: "parent.name",
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
      attributeName: "children[0].name",
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

  it("should warn when attributeName is not found", () => {
    const spy = jest.spyOn(global.console, "warn");
    spy.mockImplementation(() => {});

    const fixture = render({
      attributeName: "invalid",
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
      attributeName: "name",
      hit: { name: "foo bar" }
    });
    expect(fixture).toMatchSnapshot();
  });

  it("should use `hit.highlighted` if it exists", () => {
    const fixture = render({
      attributeName: "highlighted",
      hit: { highlighted: "<em>foo</em> bar" }
    });
    expect(fixture).toMatchSnapshot();
  });
});
