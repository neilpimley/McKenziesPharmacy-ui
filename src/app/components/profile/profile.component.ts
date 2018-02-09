import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../../services/customers.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SignupService } from '../../services/signup.service';
import { NotificationsService } from 'angular2-notifications';
import { BaseComponent } from '../base.component';
import { Title } from '../../models/Title';
import { Practice } from '../../models/Practice';
import { Doctor } from '../../models/Doctor';
import { Shop } from '../../models/Shop';
import { Address } from '../../models/Address';
import { CustomerPoco } from '../../models/CustomerPoco';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent extends BaseComponent implements OnInit {
    public editMode: boolean = false;
    public _guid: string = '00000000-0000-0000-0000-000000000000';
    public titles: Title[] = [];
    public practices: Practice[] = [];
    public doctors: Doctor[] = [];
    public shops: Shop[] = [];
    public customer: CustomerPoco;
    public practiceID: string;
    public submitted: boolean = false;
    public postCodeEntered: boolean = false;
    public addresses: Address[] = new Array<Address>();
    public addressSelected: boolean = true;
    public showAddressList: boolean = false;
    public toastOptions = {
        position: ['bottom', 'right'],
        timeOut: 2000,
        lastOnBottom: true
    };

    constructor(private signupService: SignupService, private authService: AuthService,
        private notificationService: NotificationsService,
        private customersService: CustomersService, private router: Router) {
            super();
    }

    ngOnInit() {
        this.getTitles();
        this.getShops();
        this.getPractices();

        const user = this.authService.currentUser();
        console.log('Current user: ' + JSON.stringify(user));
        this.customersService.getCustomer(user.sub).subscribe((customer) => {
            this.customer = customer as CustomerPoco;
            console.log('Customer retrieved: ' + JSON.stringify(customer));
            this.getDoctors(customer.doctor.practiceId);
        }, (error) => {
            console.log(error);
        });
    }

    public lookupAddress(): void {
        console.log('Get address list for :' + this.customer.address.postcode);
        this.showAddressList = false;
        this.addressSelected = false;
        this.addresses = [];
        this.signupService.getAddresses(this.customer.address.postcode)
            .subscribe((response) => {
                console.log(response);
                this.addresses = response as Address[];
                this.showAddressList = true;
            }, (error) => {
        });
    }


    public selectAddress(address: any): void {
        console.log(address + ' - selected');
        this.showAddressList = false;
        this.addressSelected = true;
        let a = address.split(',');
        this.customer.address = {
            addressId: this._guid,
            addressLine1: a[0],
            addressLine2: a[1],
            addressLine3: a[2],
            town: a[5],
            county: a[6],
            postcode: this.customer.address.postcode,
            createdOn: new Date()
        };
    }

    public getTitles(): void {
        this.signupService.getTitles()
            .subscribe(titles => {
                this.titles = titles as Title[];
            },
            error => {
                console.log(error);
            });
    };

    public getShops(): void {
        this.signupService.getShops()
            .subscribe(shops => {
                this.shops = shops as Shop[];
            },
            error => {
                console.log(error);
            });
    };

    public getPractices(): void {
        this.signupService.getPractices()
            .subscribe(practices => {
                this.practices = practices as Practice[];
            },
            error => {
                console.log(error);
            });
    };

    public getDoctors(practice: any): void {
        console.log('here:' + practice);
        this.practiceID = practice;
        this.signupService.getDoctorByPractice(this.practiceID)
            .subscribe(doctors => {
                this.doctors = doctors as Doctor[];
            },
            error => {
                console.log(error);
            });
    };

    public save() {
        this.customersService.updateCustomer(this.customer)
            .subscribe((customer) => {
                this.customer = customer as CustomerPoco;
                console.log('Customer saved: ' + this.customer.customerId);
                this.notificationService.success('Success', 'Your changes have been saved');
                this.editMode = false;
            }, (error) => {
                console.log('Error saving customer: ' + error);
                this.notificationService.error('Error', 'There has been a problem saving the customer', { timeOut: 0 });
            });
    }

}
