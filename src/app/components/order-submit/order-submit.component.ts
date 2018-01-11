import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import { NotificationsService } from 'angular2-notifications';
import { Router } from '@angular/router';

import { OrderPoco } from '../../models/OrderPoco';

@Component({
  selector: 'order-submit',
  templateUrl: './order-submit.component.html',
  styles: ['h6 { margin-top: 20px;margin-bottom: 20px; }', '.buttons { margin-top: 20px; }']
})
export class OrderSubmitComponent implements OnInit {
    public _guid: string = '00000000-0000-0000-0000-000000000000';
    public order: OrderPoco;
    public orderid: string = '';
    public loadingOrder: boolean = false;

    constructor(private notificationService: NotificationsService,
        private ordersService: OrdersService, private router: Router) {
    }


    ngOnInit() {
        this.getOrder();
    }

    private getOrder(): void {
        console.log('Get Order');
        this.loadingOrder = true;
        this.ordersService.getOrder()
            .subscribe((order) => {
                this.order = order as OrderPoco;
                this.order.smsReminder = true;
                this.order.emailReminder = true;
                this.orderid = order.orderID;
                this.ordersService.getOrderLines(order.orderID).subscribe((orderLines) => {
                    this.order.items = orderLines;
                    this.loadingOrder = false;
                }, 
                (error) => {
                    console.log(error);
                });
            },
            (error) => {
                console.log(error);
            });
    }

    public back(): void {
        this.router.navigate(['/order']);
    }

    public submitOrder(): void {
        this.ordersService.submitOrder(this.orderid, this.order)
            .subscribe((orderLine) => {
                this.orderid = this._guid;
                this.router.navigate(['/order-confirmation']);
            },
            (error) => {
                this.notificationService.error('Error', 'There has been a problem submitting your order', { timeOut: 0 });
            });
    }

    public showNotification(message: string): void {
        this.notificationService.success('Success', message);
    }
}