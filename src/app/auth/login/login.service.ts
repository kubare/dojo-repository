import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from '@firebase/util';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { AuthActions } from 'src/app/store/auth/auth.actions';
import { UserActions } from 'src/app/store/user/user.actions';
import { UserState } from 'src/app/store/user/user.state';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService implements OnInit {
  private userID!: string;
  private role!: any;

  constructor(
    private authService: AuthService,
    private store: Store<AppState>,
    private firebase: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.setUserData().subscribe((item) => (this.role = item?.role));
    console.log(this.role);
  }

  loginToSystem(email: string, password: string) {
    return this.authService.login(email, password).pipe(
      tap(() => {
        this.store.dispatch(AuthActions.login());
      })
    );
  }

  setUserData() {
    return this.firebase
      .doc<UserState>(`users/${this.userID}`)
      .valueChanges()
      .pipe(
        tap((user) => {
          if (user) {
            this.store.dispatch(
              UserActions.login({
                email: user.email,
                role: user.role,
                uid: user.uid,
                favouriteIC: user.favouriteIC,
                orders: user.orders,
              })
            );
          }
        })
      );
  }

  setUserID(id: string) {
    this.userID = id;
    console.log(this.userID);
  }

  getUserID() {
    return this.userID;
  }

  getUserRole() {
    return this.store.select((state) => state.user.role);
  }

  getFavIceCreams() {
    return this.store.select((state) => state.user.favouriteIC);
  }

  getUserOrder() {
    return this.store.select((state) => state.user.orders);
  }

  getUserAuth() {
    return this.store.select((state) => state.auth.isAuth);
  }
}
