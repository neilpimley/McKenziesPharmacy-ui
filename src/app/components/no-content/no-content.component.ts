import { Component } from '@angular/core';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'no-content',
  template: `
  <div class="container inner-page">
      <h2>Oops! Page not found</h2>
    </div>
  `
})
export class NotFoundComponent extends BaseComponent {

  constructor() {
    super();
  }
}
