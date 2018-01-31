
import { Drug } from './Drug';

export class DrugPoco extends Drug {

    isFavourite: boolean;
    favouriteId: string;
    orderLineId: string;
    qty: number;
}
