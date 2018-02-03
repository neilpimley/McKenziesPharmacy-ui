import { Injectable } from '@angular/core';
import { tokenNotExpired, AuthHttp, JwtHelper } from 'angular2-jwt';
import { Router } from '@angular/router';
import { CustomersService } from './customers.service';
import { authConfig } from '../config/auth.config';
import { environment } from '../../environments/environment';
import { CustomerPoco } from '../models/CustomerPoco';
import * as auth0 from 'auth0-js';

declare var Auth0: any;

@Injectable()
export class AuthService {
  auth0 = new auth0.WebAuth({
    clientID: authConfig.CLIENT_ID,
    domain: authConfig.CLIENT_DOMAIN,
    responseType: 'token id_token',
    audience: authConfig.AUDIENCE,
    redirectUri: authConfig.REDIRECT,
    scope: authConfig.SCOPE
  });

  userProfile: Object;
  jwtHelper: JwtHelper = new JwtHelper();

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
        console.log('loggged in');
        window.location.hash = '';
        this.setSession(authResult);
        this.getProfile(authResult.accessToken);
      }
    });
  }

  public getProfile(accessToken: any): void {
    console.log('getting profile....');
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        profile.user_id = profile.sub;
        console.log('saving profile: ' + JSON.stringify(profile));
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
  }

  public authenticated(): any {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
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
    localStorage.removeItem('expires_at');
    localStorage.removeItem('profile');
    this.userProfile = undefined;
    console.log('logged out');
    this.router.navigate(['/home']);
  }

  private setProfile(idToken: any) {
    const decodedToken = this.jwtHelper.decodeToken(idToken);
    console.log(JSON.stringify('decodedToken:' + decodedToken));
  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  confirmRegistration(customer: CustomerPoco): void {
    console.log('Confirming registration....');
    const headers: any = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    };
    const data: any = JSON.stringify({
      user_metadata: {
        customer_id: customer.customerId,
        address_id: customer.addressId,
        doctor_id: customer.doctorId,
        shop_id: customer.shopId,
        signed_up: true
      }
    });

    const patchUrl = 'https://' + authConfig.CLIENT_DOMAIN + '/api/v2/users/' + this.userProfile['user_id'];
    console.log('Sending data to' + patchUrl);
    console.log('data: ' + data);
    this.authHttp.patch(patchUrl, data, { headers: headers })
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
