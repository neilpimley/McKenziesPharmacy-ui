import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import { NotificationsService } from 'angular2-notifications';
import { Router } from '@angular/router';
import { BaseComponent } from '../base.component';
import { OrderPoco } from '../../models/OrderPoco';

@Component({
  selector: 'order-submit',
  templateUrl: './order-submit.component.html',
  styles: ['h6 { margin-top: 20px;margin-bottom: 20px; }', '.buttons { margin-top: 20px; }']
})
export class OrderSubmitComponent extends BaseComponent implements OnInit {
    public _guid: string = '00000000-0000-0000-0000-000000000000';
    public order: OrderPoco;
    public orderId: string = '';
    public loadingOrder: boolean = false;

    constructor(private notificationService: NotificationsService,
        private ordersService: OrdersService, private router: Router) {
            super();
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
                this.orderId = order.orderId;
                this.ordersService.getOrderLines(order.orderId).subscribe((orderLines) => {
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
        console.log('Submitting order: ' + JSON.stringify(this.order));
        this.ordersService.submitOrder(this.orderId, this.order.smsReminder, this.order.emailReminder)
            .subscribe((order: OrderPoco) => {
                this.order.orderId = order.orderId;
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