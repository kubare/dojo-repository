import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, tap } from 'rxjs';
import { IceCream } from '../../../models/ice-cream.model';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class IceCreamService {
  iceCreamList: BehaviorSubject<IceCream[]> = new BehaviorSubject<IceCream[]>(
    []
  );

  constructor(private afs: AngularFirestore, private toast: ToastrService) {}

  getIceCreamsList() {
    return this.afs.collection<IceCream>('ice-creams').snapshotChanges();
  }

  getIceCreamsValueList() {
    return this.afs
      .collection<IceCream>('ice-creams')
      .valueChanges()
      .pipe(tap((iceCreamName) => this.iceCreamList.next(iceCreamName)));
  }

  createIceCreamProduct(name: string) {
    let isExist: boolean = false;

    this.iceCreamList.getValue().forEach((iceCreamName) => {
      if (name === iceCreamName.name) {
        isExist = true;
        this.toast.error('Nazwa loda już istnieje!');
      }
    });

    if (!isExist) {
      this.afs.collection('ice-creams').add({ name });
      this.toast.success('Dodano nowego loda!');
    }
  }

  deleteIceCreamProduct(iceCream: IceCream) {
    this.toast.info('Usunięto loda!');
    return this.afs.collection('ice-creams').doc(iceCream.id).delete();
  }
}
