import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Reminder } from '../models/Reminder';
import { environment } from '../../environments/environment';

@Injectable()
export class RemindersService {
    private remindersUrl: string = environment.apiUrl + '/api/Reminders';

    constructor(private authHttp: AuthHttp) { }

    public getReminders(customerid: string): Observable<any[]> {
        console.log('Getting reminders...');
        return this.authHttp.get(this.remindersUrl + '/' + customerid).map(this.extractData)
            .catch(this.handleError);
    }

    public addReminder(reminder: Reminder): Observable<Reminder[]> {
        let bodyString = JSON.stringify(reminder);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.authHttp.post(this.remindersUrl, bodyString, options).map(this.extractData)
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
