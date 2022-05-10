import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LoginService } from 'src/app/auth/login/login.service';
import { IceCreamFavourtie, UserState } from 'src/app/store/user/user.state';

@Injectable({
  providedIn: 'root',
})
export class IceCreamsUserService {
  constructor(
    private afs: AngularFirestore,
    private loginService: LoginService
  ) {}

  addFavIceCreams(iceCream: IceCreamFavourtie, list: IceCreamFavourtie[]) {
    const id = this.loginService.getUserID();
    console.log(list);

    this.afs.doc<UserState>(`users/${id}`).update({
      favouriteIC: [...list, iceCream],
    });
  }

  removeFavIceCreams(iceCream: IceCreamFavourtie, list: IceCreamFavourtie[]) {
    const id = this.loginService.getUserID();

    const newFav = list.filter((item) => item.name !== iceCream.name);

    this.afs.doc<UserState>(`users/${id}`).update({
      favouriteIC: [...newFav],
    });
  }
}
