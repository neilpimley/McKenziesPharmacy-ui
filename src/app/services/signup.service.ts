import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from '../../environments/environment';
import { Doctor } from '../models/Doctor';
import { Practice } from '../models/Practice';
import { Shop } from '../models/Shop';
import { Title } from '../models/Title';

@Injectable()
export class SignupService {
    private practicesUrl: string = environment.apiUrl + '/api/Practices';
    private shopsUrl: string = environment.apiUrl + '/api/Shops';
    private titlesUrl: string = environment.apiUrl + '/api/Titles';
    private addressesUrl: string = environment.apiUrl + '/api/Addresses';

    constructor(private authHttp: AuthHttp) { }

    public getDoctorByPractice(practiceId: string): Observable<Doctor[]> {
        return this.authHttp.get(this.practicesUrl + '/' + practiceId + '/Doctors').map(this.extractData)
            .catch(this.handleError);
    }

    public getPractices(): Observable<Practice[]> {
        return this.authHttp.get(this.practicesUrl).map(this.extractData)
            .catch(this.handleError);
    }

    public getShops(): Observable<Shop[]> {
        return this.authHttp.get(this.shopsUrl).map(this.extractData)
            .catch(this.handleError);
    }

    public getTitles(): Observable<Title[]> {
        return this.authHttp.get(this.titlesUrl).map(this.extractData)
            .catch(this.handleError);
    }

    public getAddresses(postcode: string): Observable<any> {
        return this.authHttp.get(this.addressesUrl + '/' + postcode).map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.result ||  body || {};
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