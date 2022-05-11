import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, tap } from 'rxjs';
import { Unit } from 'src/app/models/units.model';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class UnitsService {
  unitList: BehaviorSubject<Unit[]> = new BehaviorSubject<Unit[]>([]);
  constructor(private afs: AngularFirestore, private toast: ToastrService) {}

  getUnitsList() {
    return this.afs.collection('units').snapshotChanges();
  }

  getUnitsValueList() {
    return this.afs
      .collection<Unit>('units')
      .valueChanges()
      .pipe(tap((unit) => this.unitList.next(unit)));
  }

  createUnit(value: number) {
    let isExist: boolean = false;

    this.unitList.getValue().forEach((unitValue) => {
      if (value === unitValue.value) {
        isExist = true;
        this.toast.error('Jednostka już istnieje!');
      }
    });

    if (!isExist) {
      this.afs.collection('units').add({ value });
      this.toast.success('Dodano jednostke!');
    }
  }

  deleteUnit(unit: Unit) {
    this.afs.collection('units').doc(unit.id).delete();
    this.toast.info('Usunięto jednostkę!');
  }
}
