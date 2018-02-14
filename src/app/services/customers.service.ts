import { Injectable } from '@angular/core';
import { Response, URLSearchParams } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import { CustomerPoco } from '../models/CustomerPoco';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CustomersService {
    private customersUrl: string = environment.apiUrl + '/api/Customers';
    private shopUrl: string = environment.apiUrl + '/api/Shop';
    private doctorUrl: string = environment.apiUrl + '/api/Doctor';
    private addressUrl: string = environment.apiUrl + '/api/Address';

    constructor(private authHttp: AuthHttp) { }

    public getCustomer(userId: string): Observable<CustomerPoco> {
        const params = new URLSearchParams();
        params.set('userId', userId);
        return this.authHttp.get(this.customersUrl, { search: params }).map(this.extractData)
            .catch(this.handleError);
    }

    public addCustomer(customer: CustomerPoco): Observable<any> {
        customer.createdOn = new Date();
        customer.address.createdOn = new Date();
        delete customer.title;
        delete customer.active;
        delete customer.practiceId;
        const bodyString = JSON.stringify(customer);
        console.log(bodyString);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        return this.authHttp.post(this.customersUrl, bodyString, options).map(this.extractData)
            .catch(this.handleError);
    }

    public updateCustomer(customer: CustomerPoco): Observable<any> {
        delete customer.title;
        delete customer.active;
        const bodyString = JSON.stringify(customer);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        return this.authHttp.put(this.customersUrl + '/' + customer.customerId, bodyString, options).map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        const body = res.json();
        return body.Result || body || {};
    }

    private handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        console.log('error: ' + JSON.stringify(error));
        let errMsg: string = error._body || 'Unexpected error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}