import { Injectable } from '@angular/core';
import { tokenNotExpired, AuthHttp } from 'angular2-jwt';
import { Router } from '@angular/router';
import { CustomersService } from './customers.service';
import { myConfig } from '../config/auth.config';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { CustomerPoco } from '../models/CustomerPoco';

// Avoid name not found warnings
declare var Auth0: any;

@Injectable()
export class AuthService {

    // Configure Auth0
    auth0 = new Auth0({
        domain: myConfig.domain,
        clientID: myConfig.clientID,
        callbackOnLocationHash: true,
        callbackURL: environment.callbackURL,
    }); 

    userProfile: Object;

    constructor(private router: Router, private customersService: CustomersService, private authHttp: AuthHttp) {
        const result = this.auth0.parseHash(window.location.hash);

        // Set userProfile attribute of already saved profile
        this.userProfile = JSON.parse(localStorage.getItem('profile'));

        if (result && result.idToken) {
            localStorage.setItem('id_token', result.idToken);
            localStorage.setItem('access_token', result.accessToken);

            // Fetch profile information
            this.auth0.getProfile(result.idToken, (error: any, profile:any) => {
                if (error) {
                    // Handle error
                    alert(error);
                    return;
                }

                localStorage.setItem('profile', JSON.stringify(profile));
                this.userProfile = profile;
                let customerId = profile["http://mckenzies/customer_id"];

                if (customerId) {
                    this.router.navigate(['/order']);
                } else {
                    this.router.navigate(['/register']);
                }
            });

        } else if (result && result.error) {
            alert('error: ' + result.error);
        }
    }

    public currentUser():any {
        return this.userProfile;
    }

    public login(username:any, password:any):void {
        this.auth0.login({
            connection: 'Username-Password-Authentication',
            responseType: 'token',
            email: username,
            password: password,
        }, function (err: any) {
            if (err) {
                console.error('something went wrong: ' + err.message);
                this.router.navigate(['/login', err.message]);
            }
        });
    };

    public googleLogin(): void {
        this.auth0.login({
            connection: 'google-oauth2'
        }, function (err: any) {
            if (err) {
                alert('something went wrong: ' + err.message);
            }
            console.log('google login successful');
        });
    };

    public facebookLogin(): void {
        this.auth0.login({
            connection: 'facebook'
        }, function (err: any) {
            if (err) {
                alert('something went wrong: ' + err.message);
            }
            console.log('facebook login successful');
        });
    };



    public signup(email: any, password: any): void {
        this.auth0.redirect.signupAndLogin({
            connection: 'Username-Password-Authentication',
            email,
            password,
        }, function (err: any) {
            if (err) {
                alert('Error: ' + err.description);
            }
        });
    }

    public authenticated():any {
        // Check if there's an unexpired JWT
        // It searches for an item in localStorage with key == 'id_token'
        return tokenNotExpired();
    };

    public logout(): void {
        // Remove token from localStorage
        localStorage.removeItem('id_token');
        localStorage.removeItem('profile');
        this.userProfile = undefined;
        this.router.navigate(['/home']);
    };

    confirmRegistration(customer: CustomerPoco): void {
        const headers: any = { 'Accept': 'application/json', 'Content-Type': 'application/json' };
        const data: any = JSON.stringify({
            user_metadata: {
                customerId: customer.customerID,
                addressId: customer.addressID,
                doctorId: customer.doctorID,
                shopId: customer.shopID,
                signed_up: true
            }
        });

        this.authHttp.patch('https://' + myConfig.domain + '/api/v2/users/' + this.userProfile['user_id'], data, { headers: headers })
            .map(response => response.json())
                .subscribe((response) => {
                    this.userProfile = response;
                    localStorage.setItem('profile', JSON.stringify(response));
                    this.router.navigate(['/order']);
            },
                (error) =>
                    console.log(error.json().message)
            );
    }

}