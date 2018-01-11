﻿import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import { DrugPoco } from '../models/DrugPoco';
import { Favourite } from '../models/Favourite';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class DrugsService {
    private drugsUrl: string = '/api/Drugs';
    private favouritesUrl: string = '/api/Favourites';
    private _guid: string = '00000000-0000-0000-0000-000000000000';

    constructor(private authHttp: AuthHttp) { }

    public getDrugs(drugName: string): Observable<DrugPoco[]>{
        let params = new URLSearchParams();
        params.set('drugName', drugName);
        return this.authHttp.get(this.drugsUrl, { search: params }).map(this.extractData)
            .catch(this.handleError);
    }

    public getFavouriteDrugs(): Observable<DrugPoco[]>{
        return this.authHttp.get(this.favouritesUrl).map(this.extractData)
            .catch(this.handleError);
    }

    public addFavourite(drugId: string, customerId: string): Observable<any[]> {
        let favourite: Favourite = {
            favouriteID: this._guid,
            customerID: customerId,
            drugID: drugId,
            createdOn: null
        }
        let bodyString = JSON.stringify(favourite);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.authHttp.post(this.favouritesUrl, bodyString, options).map(this.extractData)
            .catch(this.handleError);
    }

    public removeFavourite(id: string): Observable<any[]> {
        console.log('Removing Favourite:' + id);
        return this.authHttp.delete(this.favouritesUrl + '/' + id).map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || { };
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
