import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders.service';

import { OrderPoco } from '../../models/OrderPoco';

@Component({
  selector: 'previous-orders',
  templateUrl: './previous-orders.component.html',
  styleUrls: ['./previous-orders.component.css']
})
export class PreviousOrdersComponent implements OnInit {
    public orders: OrderPoco[];
    public loadingOrders: boolean = false;

    constructor(private ordersService: OrdersService) { }

    ngOnInit() {
        this.loadingOrders = true;
        this.ordersService.getOrders().subscribe((orders) => {
            this.orders = orders as OrderPoco[];
            this.loadingOrders = false;
        }, (error) => {

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
