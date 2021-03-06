import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { switchMap, tap } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { AuthActions } from 'src/app/store/auth/auth.actions';
import { UserActions } from 'src/app/store/user/user.actions';
import { UserState } from 'src/app/store/user/user.state';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private userID!: string;

  constructor(
    private authService: AuthService,
    private store: Store<AppState>,
    private firebase: AngularFirestore
  ) {}

  registerToSystem(email: string, password: string) {
    this.authService
      .register(email, password)
      .pipe(
        switchMap((newUser) => {
          return this.firebase.doc<UserState>(`users/${newUser.user!.uid}`).set(
            {
              uid: newUser.user!.uid,
              email: email,
              role: 'user',
              favouriteIC: [],
              orders: [],
            },
            { merge: true }
          );
        })
      )
      .subscribe();
  }

  loginToSystem(email: string, password: string) {
    return this.authService.login(email, password).pipe(
      tap(() => {
        this.store.dispatch(AuthActions.login());
      })
    );
  }

  logoutFromSystem() {
    return this.authService.logout().pipe(
      tap(() => {
        this.store.dispatch(UserActions.logout());
        this.store.dispatch(AuthActions.logout());
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
  }

  getUserEmail() {
    return this.store.select((state) => state.user.email);
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
