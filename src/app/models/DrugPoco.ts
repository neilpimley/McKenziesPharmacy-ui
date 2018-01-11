
import { Drug } from './Drug';

export class DrugPoco extends Drug {

    isFavourite: boolean;
    favouriteID: string;
    orderLineID: string;
    qty: number;
}
