import { Component, NgModule, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DrugsService } from '../../services/drugs.service';
import { AuthService } from '../../services/auth.service';
import { DrugPoco } from '../../models/DrugPoco';

@Component({
    selector: 'drugs',
    templateUrl: './drugs.component.html',
    styles: [
        '.border-tab { border-bottom: #ccc solid 1px;border-left: #ccc solid 1px;border-right: #ccc solid 1px; padding:5px;}'
    ]
})
export class DrugsComponent implements OnInit {
    @Output() public succesOut = new EventEmitter();
    @Output() public errorOut = new EventEmitter();
    @Output() public drugOut = new EventEmitter();

    public drugs: DrugPoco[] = [];
    public favourites: DrugPoco[] = [];
    public searchDrug: string;
    public currentDrug: DrugPoco;
    public currentFavouriteDrug: DrugPoco;
    public loadingDrugs: boolean = false;
    public loadingFavourites: boolean = false;
    public favouritesError: string;
    public drugsError: string;
    public tab: string = 'favourites';

    constructor(public drugsService: DrugsService, private authService: AuthService) {
    }

    public ngOnInit() {
        this.getFavourites();
    }

    private getFavourites(): void {
        this.loadingFavourites = true;
        this.drugsService.getFavouriteDrugs()
            .subscribe(favourites => {
                this.favourites = favourites as any[];
                this.loadingFavourites = false;
            },
            error => {
                console.error(error);
                this.favouritesError = "Could not load favourites";
                this.loadingFavourites = false;
            });
    }

    public addToBasket(drug: DrugPoco): void {
        this.drugOut.emit(drug);
    }

    public addFavourite(drug: DrugPoco): void {
        let user = this.authService.currentUser() as any;
        this.drugsService.addFavourite(drug.drugID, user.user_metadata.customerId)
            .subscribe((success) => {
                this.succesOut.emit(success);
                this.getFavourites();
                this.tab = 'favourites';
            },
            (error) => {
                this.errorOut.emit(error);
            });
    }

    public removeFavourite(drug: DrugPoco): void {
        this.drugsService.removeFavourite(drug.favouriteID)
            .subscribe((success) => {
                this.getFavourites();
                this.succesOut.emit(success);
            },
            (error) => {
                console.error(error);
                this.errorOut.emit("Could not add drug to favourites");
            });
    }

    public searchDrugs(searchDrug: string): void {
        this.loadingDrugs = true;
        this.drugsService.getDrugs(searchDrug)
            .subscribe((drugs) => {
                this.drugs = drugs as any[];
                this.loadingDrugs = false;
            },
            (error) => {
                console.error(error);
                this.drugsError = "Could not load drugs";
                this.loadingDrugs = false;
            });
    };

    public selectedDrug(drug: DrugPoco): void {
        this.currentFavouriteDrug = drug;
    }

    public selectedFavourite(drug: DrugPoco): void {
        this.currentFavouriteDrug = drug;
    }

    public isSelected(drug: DrugPoco): boolean {
        if (!this.currentDrug) return false;
        return this.currentDrug.drugID === drug.drugID ? true : false;
    }

    public isSelectedFavourite(drug: DrugPoco): boolean {
        if (!this.currentFavouriteDrug) return false;
        return this.currentFavouriteDrug.drugID === drug.drugID ? true : false;
    }

   
}