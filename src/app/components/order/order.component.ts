import { ViewChild, Input, Component, Inject, ElementRef, EventEmitter, HostListener, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../services/auth.service';
import { OrdersService } from '../../services/orders.service';
import { NotificationsService } from  'angular2-notifications';
import { Router } from '@angular/router';
import { BaseComponent } from '../base.component';
import { Order } from '../../models/Order';
import { Drug } from '../../models/Drug';

@Component({
    selector: 'order',
    templateUrl: './order.component.html',
})
export class OrderComponent extends BaseComponent implements OnInit  {
    public  _guid: string = '00000000-0000-0000-0000-000000000000';
    public order: Order;
    public orderId: string = '';
    public enableOrderButon: boolean = false;
    public toastOptions = {
        position: ['bottom', 'right'],
        timeOut: 2000,
        lastOnBottom: true
    };

    public addedDrug: Drug = {
        drugId: this._guid,
        drugName: '',
        drugDose: '',
        packSize: 0,
        createdOn: new Date(),
        modifiedOn: new Date()
    };

     constructor(private notificationService: NotificationsService,
        private ordersService: OrdersService, private router: Router) {
            super();
    }

    public ngOnInit() {
        this.getOrder();
    }

    private getOrder(): void {
        console.log('Get Order');
        this.ordersService.getOrder()
            .subscribe((order) => {
                this.order = order as Order;
                this.orderId = order.orderId;
            },
            (error) => {
                console.log(error);
            });
    }

    public drugAdded(drug: Drug): void {
        this.ordersService.addToBasket(drug.drugId, this.order.orderId)
            .subscribe((orderLine) => {
                this.addedDrug.drugId = orderLine.drugId;
                this.notificationService.success('Success', 'Item has been added to order');
            },
            (error) => {
                this.notificationService.error('Error', 'There has been a problem adding the item to the order', { timeOut : 0 });
            });
    }

    public submitOrder(): void {
        this.router.navigate(['/order-submit']);
    }

    public toggleOrderButton(flag: boolean) {
        this.enableOrderButon = flag;
    }

    public showNotification(message: string): void {
        this.notificationService.success('Success', message);
    }

    public showSuccess(message: string): void {
        this.notificationService.success('Success', message);
    }

    public showError(message: string): void {
        this.notificationService.error('Error', message);
    }
}
