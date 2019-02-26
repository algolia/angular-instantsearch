import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-image',
  template: `
    <img
      [src]="src"
      [ngClass]="{ transparent: !loaded }"
      (load)="onLoad()"
    />
  `
})
export class ProductImageComponent {
  @Input() src: string;

  loaded = false;

  onLoad() {
    this.loaded = true;
  }
}
