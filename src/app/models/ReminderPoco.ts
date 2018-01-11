
import { DrugPoco } from './DrugPoco';
import { Reminder } from './Reminder';

export class ReminderPoco extends Reminder {

    email: string;
    mobile: string;
    orderID: string;
    drugs: DrugPoco[];
}
