
import { CustomerPoco } from './CustomerPoco';
import { DrugPoco } from './DrugPoco';
import { Order } from './Order';

export class OrderPoco extends Order {

    customer: CustomerPoco;
    items: DrugPoco[];
    smsReminder: boolean;
    emailReminder: boolean;
}
