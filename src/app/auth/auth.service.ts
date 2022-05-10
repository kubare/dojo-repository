import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as auth from 'firebase/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser$ = this.afAuth.authState;

  constructor(private afAuth: AngularFireAuth) {}

  login(email: string, password: string) {
    return from(this.afAuth.signInWithEmailAndPassword(email, password));
  }

  logout() {
    return from(this.afAuth.signOut());
  }

  register(email: string, password: string) {
    return from(this.afAuth.createUserWithEmailAndPassword(email, password));
  }
}
