import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './services/auth-guard.service';

import { PostBackComponent } from './components/postback.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { OrderComponent } from './components/order/order.component';
import { OrderSubmitComponent } from './components/order-submit/order-submit.component';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';
import { NotFoundComponent } from './components/no-content/no-content.component';
import { PreviousOrdersComponent } from './components/previous-orders/previous-orders.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RemindersComponent } from './components/reminders/reminders.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'postback',
        component: PostBackComponent
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'order',
        component: OrderComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'order-confirmation',
        component: OrderConfirmationComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'previous-orders',
        component: PreviousOrdersComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'order-submit',
        component: OrderSubmitComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'reminders',
        component: RemindersComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "**",
        component: NotFoundComponent,
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routedComponents = [
    HomeComponent, PostBackComponent, RegisterComponent, ProfileComponent, RemindersComponent,
    OrderComponent, OrderConfirmationComponent, NotFoundComponent, PreviousOrdersComponent
];