import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import { DrugPoco } from '../../models/DrugPoco';
import { OrderLine } from '../../models/OrderLine';


@Component({
    selector: 'basket',
    templateUrl: './basket.component.html'
})
export class BasketComponent implements OnInit {
    @Input() public  drugId: string = ''; // id of the last added drug, watch and refresh the basket when it changes
    @Input() public orderId: string; // id of the last added drug, watch and refresh the basket when it changes
    @Output() public successOut = new EventEmitter();
    @Output() public errorOut = new EventEmitter();
    @Output() public canOrder = new EventEmitter();

    public orderLines: DrugPoco[] = [];
    public currentOrderLine: DrugPoco;
    public loadingOrderLines: boolean = true;
    public error: string;

    constructor(private ordersService: OrdersService) { }

    ngOnChanges(changes: SimpleChanges) {
        if (this.orderId) {
            console.log('Get Order Lines:' + this.orderId);
            this.getOrderLines(this.orderId);
        }
    }

    ngOnInit() {
        
    }

    public getOrderLines(orderId: string): void {
        this.loadingOrderLines = true;
        this.ordersService.getOrderLines(orderId)
            .subscribe((orderLines) => {
                this.orderLines = orderLines as DrugPoco[];
                this.loadingOrderLines = false;
                this.canOrder.emit(this.orderLines.length > 0);
            },
            (error) => {
                console.log(error);
                this.error = "Could not load basket";
                this.loadingOrderLines = false;
            });
    }

    public selectedOderLine(orderLine: DrugPoco): void {
        this.currentOrderLine = orderLine;
    }

    public isSelected(orderLine: DrugPoco): boolean {
        if (!this.currentOrderLine) {
            return false;
        }
        return this.currentOrderLine.drugID === orderLine.drugID ? true : false;
    }

    public removeFromBasket(orderLine: OrderLine): void {
        this.ordersService.removeFromBasket(orderLine.orderLineID)
            .subscribe((success) => {
                this.getOrderLines(this.orderId);
                this.successOut.emit('Item removed from basket');
            },
            (error) => {
                this.errorOut.emit(error);
            });
    }

}