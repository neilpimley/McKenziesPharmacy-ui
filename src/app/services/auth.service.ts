import { Injectable } from '@angular/core';
import { tokenNotExpired, AuthHttp } from 'angular2-jwt';
import { Router } from '@angular/router';
import { CustomersService } from './customers.service';
import { myConfig } from '../config/auth.config';
import { environment } from '../../environments/environment';
import { CustomerPoco } from '../models/CustomerPoco';
import * as auth0 from 'auth0-js';

declare var Auth0: any;

@Injectable()
export class AuthService {
  auth0 = new auth0.WebAuth({
    clientID: myConfig.CLIENT_ID,
    domain: myConfig.CLIENT_DOMAIN,
    responseType: 'token id_token access_token',
    audience: myConfig.AUDIENCE,
    redirectUri: myConfig.REDIRECT,
    scope: myConfig.SCOPE
  });

  userProfile: Object;

  constructor(
    private router: Router,
    private customersService: CustomersService,
    private authHttp: AuthHttp
  ) {}

  public handleAuthentication(): void {
    this.auth0.parseHash({ _idTokenVerification: false }, (err, authResult) => {
      if (err) {
        alert(`Error: ${err.errorDescription}`);
      }
      if (authResult && authResult.accessToken && authResult.idToken) {
        console.log('loggged in ');
        window.location.hash = '';
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);

        this.auth0.client.userInfo(
            authResult.accessToken,
            (err, profile) => {
            console.log('profile: ' + profile);
            if (profile) {
                localStorage.setItem('profile', JSON.stringify(profile));
                this.userProfile = profile;

                if (profile.user_metadata && profile.user_metadata.customerId) {
                    this.router.navigate(['/order']);
                } else {
                    this.router.navigate(['/register']);
                }
            }
        });

      }
    });
  }

  public currentUser(): any {
    return this.userProfile;
  }

  public login(username: string, password: string) {
    this.auth0.redirect.loginWithCredentials(
      {
        connection: 'Username-Password-Authentication',
        username,
        password
      },
      function(err: any) {
        if (err) {
          console.error('something went wrong: ' + err.message);
          this.router.navigate(['/login', err.message]);
        }
      }
    );
    /*
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
    */
  }


  public authenticated(): any {
    // Check if there's an unexpired JWT
    // This searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired('id_token');
  }

  public googleLogin(): void {
    this.auth0.authorize(
      {
        connection: 'google-oauth2'
      },
      function(err: any) {
        if (err) {
          alert('something went wrong: ' + err.message);
        }
        console.log('google login successful');
      }
    );
  }

  public facebookLogin(): void {
    this.auth0.authorize(
      {
        connection: 'facebook'
      },
      function(err: any) {
        if (err) {
          alert('something went wrong: ' + err.message);
        }
        console.log('facebook login successful');
      }
    );
  }

  public signup(email: any, password: any): void {
    this.auth0.redirect.signupAndLogin(
      {
        connection: 'Username-Password-Authentication',
        email,
        password
      },
      function(err: any) {
        if (err) {
          alert('Error: ' + err.description);
        }
      }
    );
  }

  public logout(): void {
    // Remove token from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    this.userProfile = undefined;
    this.router.navigate(['/home']);
  }

  private setUser(authResult) {
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
  }

  confirmRegistration(customer: CustomerPoco): void {
    const headers: any = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    };
    const data: any = JSON.stringify({
      user_metadata: {
        customerId: customer.customerID,
        addressId: customer.addressID,
        doctorId: customer.doctorID,
        shopId: customer.shopID,
        signed_up: true
      }
    });

    this.authHttp
      .patch(
        'https://' +
          myConfig.CLIENT_DOMAIN +
          '/api/v2/users/' +
          this.userProfile['user_id'],
        data,
        { headers: headers }
      )
      .map(response => response.json())
      .subscribe(
        response => {
          this.userProfile = response;
          localStorage.setItem('profile', JSON.stringify(response));
          this.router.navigate(['/order']);
        },
        error => console.log(error.json().message)
      );
  }
}
