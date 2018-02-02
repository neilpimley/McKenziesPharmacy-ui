import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'order-confirmation',
  templateUrl: './order-confirmation.component.html'
})
export class OrderConfirmationComponent extends BaseComponent {

  constructor(){
    super();
  }
}
