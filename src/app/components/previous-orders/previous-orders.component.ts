import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import { NotificationsService } from 'angular2-notifications';
import { Router } from '@angular/router';
import { BaseComponent } from '../base.component';
import { OrderPoco } from '../../models/OrderPoco';

@Component({
  selector: 'previous-orders',
  templateUrl: './previous-orders.component.html',
  styleUrls: ['./previous-orders.component.css']
})
export class PreviousOrdersComponent extends BaseComponent implements OnInit {
    public orders: OrderPoco[];
    public loadingOrders: boolean = false;

    constructor(private notificationService: NotificationsService,
        private ordersService: OrdersService, private router: Router) {
            super();
    }

    ngOnInit() {
        this.loadingOrders = true;
        this.ordersService.getOrders().subscribe((orders) => {
            this.orders = orders as OrderPoco[];
            this.loadingOrders = false;
        }, (error) => {

        });
    }

    public reOrder(orderId: any) {
        this.ordersService.reOrder(orderId)
        .subscribe((order: OrderPoco) => {
            this.router.navigate(['/order-confirmation']);
        },
        (error) => {
            this.notificationService.error('Error', 'There has been a problem with your reorder', { timeOut: 0 });
        });
    }

    public getStatusLabel(status: number) {
        switch (status)
        {
            case 2:
                return 'Ordered';
            case 3:
                return 'Processed';
            case 4:
                return 'Delivered';
        }
    }
}
