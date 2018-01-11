
import { Title } from './Title';
import { Doctor } from './Doctor';
import { Shop } from './Shop';
import { Address } from './Address';
import { Customer } from './Customer';

export class CustomerPoco extends Customer {

    title: Title;
    fullname: string;
    doctor: Doctor;
    shop: Shop;
    address: Address;
    practiceID: string;
    confirmEmail: string;
    password: string;
    confirmPassword: string;
}
