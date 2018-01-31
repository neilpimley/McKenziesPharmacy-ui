import { Injectable } from '@angular/core';
import { Response, URLSearchParams } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import { CustomerPoco } from '../models/CustomerPoco';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from '../../environments/environment';

@Injectable()
export class CustomersService {
    private customersUrl: string = environment.apiUrl + '/api/Customers';
    private shopUrl: string = environment.apiUrl + '/api/Shop';
    private doctorUrl: string = environment.apiUrl + '/api/Doctor';
    private addressUrl: string = environment.apiUrl + '/api/Address';

    constructor(private authHttp: AuthHttp) { }

    public getCustomer(userid: string): Observable<CustomerPoco> {
        let params = new URLSearchParams();
        params.set('userid', userid);
        return this.authHttp.get(this.customersUrl, { search: params }).map(this.extractData)
            .catch(this.handleError);
    }

    public addCustomer(customer: CustomerPoco): Observable<any> {
        let bodyString = JSON.stringify(customer);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.authHttp.post(this.customersUrl, bodyString, options).map(this.extractData)
            .catch(this.handleError);
    }

    public updateCustomer(customer: CustomerPoco): Observable<any> {
        let bodyString = JSON.stringify(customer);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.authHttp.put(this.customersUrl + '/' + customer.customerID, bodyString, options).map(this.extractData)
            .catch(this.handleError);
    }

   
    private extractData(res: Response) {
        let body = res.json();
        return body || {};
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