import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IceCream } from '../../../models/ice-cream.model';

@Injectable({
  providedIn: 'root',
})
export class IceCreamService {
  constructor(private afs: AngularFirestore) {}

  getIceCreamsList() {
    return this.afs.collection<IceCream>('ice-creams').snapshotChanges();
  }

  getIceCreamsValueList() {
    return this.afs.collection<IceCream>('ice-creams').valueChanges();
  }

  createIceCreamProduct(name: IceCream) {
    return this.afs.collection('ice-creams').add({ name });
  }

  deleteIceCreamProduct(iceCream: IceCream) {
    return this.afs.collection('ice-creams').doc(iceCream.id).delete();
  }
}
