import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from '../../environments/environment';
import { Order } from '../models/Order';
import { OrderLine } from '../models/OrderLine';
import { OrderPoco } from '../models/OrderPoco';
import { DrugPoco } from '../models/DrugPoco';
import { Drug } from '../models/Drug';

@Injectable()
export class OrdersService {
    private ordersUrl: string = environment.apiUrl + '/api/Orders';
    private orderUrl: string = environment.apiUrl + '/api/Order';
    private orderLinesUrl: string = environment.apiUrl + '/api/OrderLines';
    private _guid = '00000000-0000-0000-0000-000000000000';

    constructor(private authHttp: AuthHttp) { }

    public getOrder(): Observable<Order> {
        return this.authHttp.get(this.orderUrl).map(this.extractData)
            .catch(this.handleError);
    }

    public getOrders(): Observable<OrderPoco[]> {
        return this.authHttp.get(this.ordersUrl).map(this.extractData)
            .catch(this.handleError);
    }

    public getOrderLines(orderId: string): Observable<DrugPoco[]> {
        return this.authHttp.get(this.orderLinesUrl + '/' + orderId).map(this.extractData)
            .catch(this.handleError);
    }

    public submitOrder(orderId: string, smsReminder: boolean, emailReminder: boolean): Observable<OrderPoco> {
        const reminders = {
            smsReminder,
            emailReminder
        };
        const bodyString = JSON.stringify(reminders);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        return this.authHttp.put(this.orderUrl + '/' + orderId, bodyString, options).map(this.extractData)
            .catch(this.handleError);
    }

    public addToBasket(drugId: string, orderId: string): Observable<Drug> {
        const orderLine: OrderLine = {
            orderLineId: this._guid,
            drugId : drugId,
            orderId: orderId,
            qty: 1,
            createdOn: new Date(),
            orderLineStatus: 0
        };
        console.log('Adding to basket: ' + JSON.stringify(orderLine));
        const bodyString = JSON.stringify(orderLine);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        return this.authHttp.post(this.orderLinesUrl, bodyString, options).map(this.extractData)
            .catch(this.handleError);
    }

    public removeFromBasket(id: string): Observable<any> {
        return this.authHttp.delete(this.orderLinesUrl + '/' + id).map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        const body = res.json();
        return body.result || body || { };
    }

    private handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}