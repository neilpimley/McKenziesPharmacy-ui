import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavBarComponent {
    @ViewChild(LoginComponent) public loginModal: LoginComponent;
    @ViewChild(SignupComponent) public signupModal: SignupComponent;

    constructor(public auth: AuthService, public router: Router) {
       
    }

    public logout(): void {
        console.log('logging out');
        this.auth.logout();
        this.router.navigate(['/home']);
    }

    public showLoginModal(): void {
        this.loginModal.showModal = true;
    }

    public showSignupModal(): void {
        this.signupModal.showModal = true;
    }

    
}
