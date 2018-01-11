import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {
    public showModal: boolean = false;
    public model: any = {
        username: '',
        password: ''
    };

    constructor(public auth: AuthService) { }

    ngOnInit() {
    }

    public signup() {
        this.auth.signup(this.model.username, this.model.password);
    }
}
