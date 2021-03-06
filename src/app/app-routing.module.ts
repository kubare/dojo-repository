import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './component/home/home.component';
import {
  canActivate,
  redirectUnauthorizedTo,
  redirectLoggedInTo,
} from '@angular/fire/compat/auth-guard';
import { AdminComponent } from './component/admin/admin.component';
import { AdminGuard } from './auth/guards/admin.guard';
import { IceCreamsComponent } from './component/admin/ice-creams/ice-creams.component';
import { UnitsComponent } from './component/admin/units/units.component';
import { UserGuard } from './auth/guards/user.guard';
import { UserListComponent } from './component/admin/lists/user-list/user-list.component';
import { IceCreamsUserComponent } from './component/home/ice-creams-user/ice-creams-user.component';
import { FavIceCreamsUserComponent } from './component/home/fav-ice-creams-user/fav-ice-creams-user.component';
import { OrderComponent } from './component/home/order/order.component';
import { OrderListComponent } from './component/home/order-list/order-list.component';
import { UserOrdersComponent } from './component/admin/lists/user-orders/user-orders.component';
import { MainComponent } from './component/main/main.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { CreateUserComponent } from './component/admin/create-user/create-user.component';

const redirectToLogin = () => redirectUnauthorizedTo(['login']);
const redirectToHome = () => redirectLoggedInTo(['main']);

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'main',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AdminGuard],
        children: [
          { path: 'ice-creams', component: IceCreamsComponent },
          { path: 'units', component: UnitsComponent },
          { path: 'users', component: UserListComponent },
          { path: 'orders', component: UserOrdersComponent },
          { path: 'create-user', component: CreateUserComponent },
        ],
      },
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [UserGuard],
        children: [
          { path: 'ice-cream-list', component: IceCreamsUserComponent },
          { path: 'fav-list', component: FavIceCreamsUserComponent },
          { path: 'order', component: OrderComponent },
          { path: 'order-list', component: OrderListComponent },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
