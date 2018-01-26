import { Component }  from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

// http://stackoverflow.com/questions/40153087/angular2-jwt-and-ahead-of-time-compilation

export function authFactory(http: Http, options: RequestOptions) {
    return new AuthHttp(new AuthConfig({
            tokenGetter: (() => localStorage.getItem('access_token'))
          }), http, options);
};

// Include this in your ngModule providers
export const AuthProvider = {
    provide: AuthHttp,
    deps: [Http, RequestOptions],
    useFactory: authFactory
};