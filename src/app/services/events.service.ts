import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class EventsService {
    public showNavBar: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor() {

    }
}