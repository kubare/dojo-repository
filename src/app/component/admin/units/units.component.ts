import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Unit } from 'src/app/models/units.model';
import { UnitsService } from './units.service';

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitsComponent implements OnInit, OnDestroy {
  unitInput = new FormControl('');
  displayedColumns: string[] = ['unit', 'actions'];
  public units$: Observable<Unit[]> = this.unitService.getUnitsValueList();
  units!: Unit[];
  getIdUnits!: Subscription;

  constructor(private unitService: UnitsService) {}

  ngOnInit() {
    this.getIdUnits = this.unitService.getUnitsList().subscribe((data) => {
      this.units = data.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Unit),
        };
      });
    });
  }

  addIceCream() {
    this.unitService.createUnit(this.unitInput.value);
  }

  removeUnit(unit: Unit) {
    this.unitService.deleteUnit(unit);
  }

  ngOnDestroy(): void {
    this.getIdUnits.unsubscribe();
  }
}
