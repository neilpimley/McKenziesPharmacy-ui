import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
    selector: 'app-root',
    encapsulation: ViewEncapsulation.None,
    providers: [AuthService],
    template: `
        <navbar></navbar>       
        <main>
            <router-outlet></router-outlet>
        </main>
  `
})
export class AppComponent {
    public title = 'McKenzies Pharmacy';
    public isCollapsed: boolean = true;

    constructor(public authService: AuthService) { }

}