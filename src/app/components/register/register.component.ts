import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SignupService } from '../../services/signup.service';
import { AuthService } from '../../services/auth.service';
import { CustomersService } from '../../services/customers.service';
import { NotificationsService } from 'angular2-notifications';

import { Title } from '../../models/Title';
import { Practice } from '../../models/Practice';
import { Doctor } from '../../models/Doctor';
import { Shop } from '../../models/Shop';
import { CustomerPoco } from '../../models/CustomerPoco';
import { Address } from '../../models/Address';
import { BaseComponent } from '../base.component';


@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: ['/register.component.css']
})
export class RegisterComponent extends BaseComponent {

    public titles: Title[] = new Array<Title>();
    public practices: Practice[] = new Array<Practice>();
    public doctors: Doctor[] = new Array<Doctor>();
    public shops: Shop[] = new Array<Shop>();
    public customer: CustomerPoco;
    public practiceId: string;
    public genders: any = [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
    ];
    public submitted: boolean = false;
    public postCodeEntered: boolean = false;
    public addresses: Address[] = new Array<Address>();
    public addressSelected: boolean = false;
    public showAddressList: boolean = false;
    public _guid: string = '00000000-0000-0000-0000-000000000000';
    public agreeTerms: boolean = false;
    public toastOptions = {
        position: ['bottom', 'right'],
        timeOut: 2000,
        lastOnBottom: true
    };

    constructor(private signupService: SignupService, private authService: AuthService,
        private notificationService: NotificationsService,
        private customersService: CustomersService, private router: Router) {
            super();
        this.practiceId = '';
    }

    private prePopulateFields(): void {
        const userProfile = this.authService.currentUser() as any;
        this.customer = {
            customerId: this._guid,
            userId: userProfile.sub,
            email: userProfile.email,
            titleId: '',
            firstname: userProfile.given_name,
            lastname: userProfile.family_name,
            fullname: '',
            sex: userProfile.gender,
            mobile: null,
            home: null,
            dob: null,
            addressId: this._guid,
            doctorId: '',
            shopId: '',
            createdOn: null,
            modifiedOn: null,
            active: null,
            title: null,
            practiceId: null,
            address: {
                addressId: null,
                addressLine1: '',
                addressLine2: '',
                addressLine3: '',
                county: '',
                town: '',
                postcode:'',
                createdOn: null,
            },
            shop: null,
            doctor: null,
            password: '',
            confirmPassword: '',
            confirmEmail: ''
        };
    };

    public getTitles(): void {
        this.signupService.getTitles()
            .subscribe((titles) => {
                this.titles = titles as Title[];
            },
            (error) => {
                console.log(error);
            });
    };

    public getShops(): void {
        this.signupService.getShops()
            .subscribe((shops) => {
                this.shops = shops as Shop[];
            },
            (error) => {
                console.log(error);
            });
    };

    public getPractices(): void {
        this.signupService.getPractices()
            .subscribe((practices) => {
                this.practices = practices as Practice[];
            },
            (error) => {
                console.log(error);
            });
    };

    public getDoctors(practice: any): void {
        this.practiceId = practice;
        this.signupService.getDoctorByPractice(this.practiceId)
            .subscribe((doctors) => {
                this.doctors = doctors as Doctor[];
            },
            (error) => {
                console.log(error);
            });
    };

    ngOnInit() {
        this.getTitles();
        this.getShops();
        this.getPractices();
        this.prePopulateFields();
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

    public selectAddress(idx: any): void {
        console.log(this.addresses[idx] + ' - selected');
        this.showAddressList = false;
        this.addressSelected = true;
        this.customer.address = this.addresses[idx];
    }

    public registerCustomer(): void {
        this.submitted = true;
        console.log('Adding customer: ' + JSON.stringify(this.customer));
        this.customersService.addCustomer(this.customer)
            .subscribe((customer) => {
                this.customer = customer as CustomerPoco;
                console.log('Customer registered');
                this.authService.confirmRegistration(this.customer);
            }, (error) => {
                console.log(error);
                this.notificationService.error('Error', 'An error has prevented your succes registration');
            });
    }

    get diagnostic() { return JSON.stringify(this.customer); }

};