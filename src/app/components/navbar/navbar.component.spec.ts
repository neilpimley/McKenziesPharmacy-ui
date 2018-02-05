import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NavBarComponent } from './navbar.component';

describe('BannerComponent (inline template)', () => {
    
    let comp:    NavBarComponent;
    let fixture: ComponentFixture<NavBarComponent>;
    let de:      DebugElement;
    let el:      HTMLElement;

    beforeEach(() => {
    TestBed.configureTestingModule({
        declarations: [ NavBarComponent ], // declare the test component
    });

    fixture = TestBed.createComponent(NavBarComponent);

    comp = fixture.componentInstance; // BannerComponent test instance

    // query for the title <h1> by CSS element selector
    de = fixture.debugElement.query(By.css('.navbar-brand'));
    el = de.nativeElement;
    });
});