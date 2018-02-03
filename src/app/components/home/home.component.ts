import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { BaseComponent } from '../base.component';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent extends BaseComponent {

    public markers: any[] = [
        { lat: 54.5895613, lng: -5.9713866 },
        { lat: 54.620454, lng: -6.218681 },
        { lat: 54.6143664, lng: -5.967621 },
        { lat: 54.6146198, lng: -5.967728 },
        { lat: 54.61259, lng: -5.9287854 },
    ];
    public lat: number = 54.5948591;
    public lng: number = -5.9629778;

    constructor(private auth: AuthService, private router: Router) {
        super();
        if (auth.authenticated) {
            console.log('User is logged in so redirect to order page');
            this.router.navigate(['/order']);
        }
    }

}