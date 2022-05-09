import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IceCream } from './ice-cream.model';

@Injectable({
  providedIn: 'root',
})
export class IceCreamService {
  constructor(private afs: AngularFirestore) {}

  getIceCream(id: string) {
    return this.afs.collection('ice-creams').doc(id).valueChanges();
  }

  getIceCreamsList() {
    return this.afs.collection('ice-creams').snapshotChanges();
  }

  getIceCreamsValueList() {
    return this.afs.collection('ice-creams').valueChanges();
  }

  createIceCreamProduct(name: IceCream) {
    return this.afs.collection('ice-creams').add({ name });
  }

  deleteIceCreamProduct(iceCream: IceCream) {
    return this.afs.collection('ice-creams').doc(iceCream.id).delete();
  }

  updateIceCreamProduct(iceCream: IceCream, id: string) {
    return this.afs.collection('ice-creams').doc(id).update({
      name: iceCream.name,
    });
  }
}
