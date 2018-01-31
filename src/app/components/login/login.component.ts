import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent {
    public showModal: boolean = false;
    public model: any = {
        username: '',
        password: ''
    };

    constructor(public auth: AuthService) { }

    public login() {
        this.auth.login(this.model.username, this.model.password);
    }

};