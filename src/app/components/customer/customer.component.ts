import { Component, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CustomersService } from '../../services/customers.service';

import { CustomerPoco } from '../../models/CustomerPoco';

@Component({
    selector: 'customer',
    templateUrl: './customer.component.html'
})
export class CustomerComponent {
    @Input() public canEdit: boolean = false;
    public customer: CustomerPoco;
    public loadingCustomer: boolean = true;
    public error: string;

    constructor(private auth: AuthService,
        public customersService: CustomersService) {
        let user = auth.currentUser() as any;
        this.getCustomer(user.user_id);
    }

    private getCustomer(customerId: string): void {
        this.customersService.getCustomer(customerId)
            .subscribe((customer) => {
                this.customer = customer as CustomerPoco;
                this.loadingCustomer = false;
            }, (error) => {
                console.log(error);
                this.error = "Could not load customer";
                this.loadingCustomer = false;
            });
    }

    

    

}
