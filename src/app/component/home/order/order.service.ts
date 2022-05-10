import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LoginService } from 'src/app/auth/login/login.service';
import { Order, SingleOrder, UserState } from 'src/app/store/user/user.state';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private loginService: LoginService,
    private afs: AngularFirestore
  ) {}

  addOrder(order: any, list: Order[]) {
    const id = this.loginService.getUserID();
    const date = new Date();
    const formatData = date.toLocaleDateString('en-US');
    console.log(order);

    console.log(date);

    this.afs.doc<UserState>(`users/${id}`).update({
      orders: [...list, { ...order, date: formatData }],
    });
  }
}
