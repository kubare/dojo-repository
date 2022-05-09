import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import { HotToastModule } from '@ngneat/hot-toast';
import { AdminComponent } from './component/admin/admin.component';
import { StoreModule } from '@ngrx/store';
import { AppState } from './store/app.state';
import { userReducer } from './store/user/user.reducer';
import { authReducer } from './store/auth/auth.reducer';
import { AdminGuard } from './auth/guards/admin.guard';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { IceCreamsComponent } from './component/admin/ice-creams/ice-creams.component';
import { UnitsComponent } from './component/admin/units/units.component';
import { UserListComponent } from './component/admin/lists/user-list/user-list.component';
import { IceCreamsUserComponent } from './component/home/ice-creams-user/ice-creams-user.component';
import { FavIceCreamsUserComponent } from './component/home/fav-ice-creams-user/fav-ice-creams-user.component';
import { OrderComponent } from './component/home/order/order.component';
import { OrderListComponent } from './component/home/order-list/order-list.component';
import { UserOrdersComponent } from './component/admin/lists/user-orders/user-orders.component';
import { MatCardModule } from '@angular/material/card';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AdminComponent,
    IceCreamsComponent,
    UnitsComponent,
    UserListComponent,
    IceCreamsUserComponent,
    FavIceCreamsUserComponent,
    OrderComponent,
    OrderListComponent,
    UserOrdersComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatInputModule,
    HotToastModule.forRoot(),
    StoreModule.forRoot<AppState>({
      user: userReducer,
      auth: authReducer,
    }),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production,
      autoPause: true,
    }),
  ],
  providers: [AdminGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
