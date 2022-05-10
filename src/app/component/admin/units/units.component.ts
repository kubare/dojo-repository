import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Unit } from 'src/app/models/units.model';
import { UnitsService } from './units.service';

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitsComponent implements OnInit {
  unitInput = new FormControl('');
  displayedColumns: string[] = ['unit', 'actions'];
  public units$: Observable<Unit[]> = this.unitService.getUnitsValueList();
  units!: Unit[];

  constructor(private unitService: UnitsService) {}

  ngOnInit() {
    this.unitService.getUnitsList().subscribe((data) => {
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
}
