import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CollapseModule, TabsModule, ModalModule } from 'ngx-bootstrap';
import { DialogModule } from 'primeng/components/dialog/dialog';
import { ScheduleModule } from 'primeng/components/schedule/schedule';
import { SimpleNotificationsModule, NotificationsService, SimpleNotificationsComponent } from 'angular2-notifications';
import { AgmCoreModule } from '@agm/core';
import { UiSwitchModule } from 'ngx-toggle-switch/src';

import './rxjs-operators';
import { AppComponent } from './app.component';
import { AppRoutingModule, routedComponents } from './app-routing.module';

import { DrugsService } from './services/drugs.service';
import { SignupService } from './services/signup.service';
import { CustomersService } from './services/customers.service';
import { OrdersService } from './services/orders.service';
import { RemindersService } from './services/reminders.service';
import { EventsService } from './services/events.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';

import { AuthProvider } from './providers/auth.provider';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PostBackComponent } from './components/postback.component';
import { RegisterComponent } from './components/register/register.component';
import { DrugsComponent } from './components/drugs/drugs.component';
import { OrderComponent } from './components/order/order.component';
import { PreviousOrdersComponent } from './components/previous-orders/previous-orders.component';
import { BasketComponent } from './components/basket/basket.component';
import { CustomerComponent } from './components/customer/customer.component';
import { NotFoundComponent } from './components/no-content/no-content.component';
import { NavBarComponent } from './components/navbar/navbar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';
import { SignupComponent } from './components/signup/signup.component';
import { RemindersComponent } from './components/reminders/reminders.component';
import { OrderSubmitComponent } from './components/order-submit/order-submit.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpModule,
        BrowserAnimationsModule,
        SimpleNotificationsModule,
        DialogModule,
        ScheduleModule,
        CollapseModule,
        UiSwitchModule,
        ModalModule.forRoot(),
        TabsModule.forRoot(),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyBLTDMJ-uKfUMbhCgFWtWKi5H4Jvn_jyHc'
        })
    ],
    declarations: [
        AppComponent,
        routedComponents,
        PostBackComponent,
        DrugsComponent,
        HomeComponent,
        LoginComponent,
        OrderComponent,
        RegisterComponent,
        NavBarComponent,
        BasketComponent,
        CustomerComponent,
        NotFoundComponent,
        PreviousOrdersComponent,
        ProfileComponent,
        OrderConfirmationComponent,
        SignupComponent,
        RemindersComponent,
        OrderSubmitComponent
    ],
    providers: [
        AuthGuard,
        AuthProvider,
        AuthService,
        DrugsService,
        SignupService,
        NotificationsService,
        CustomersService,
        OrdersService,
        EventsService,
        RemindersService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }


