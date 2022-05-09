import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Unit } from './units.model';
import { UnitsService } from './units.service';

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.css'],
})
export class UnitsComponent implements OnInit {
  unitInput = new FormControl('');
  displayedColumns: string[] = ['unit', 'actions'];
  public units$: Observable<any> = this.unitService.getUnitsList();
  units!: Unit[];

  constructor(private unitService: UnitsService) {}

  ngOnInit() {
    this.unitService.getUnitsList().subscribe((data) => {
      this.units = data.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as any),
        };
      });
    });
  }

  addIceCream() {
    this.unitService.createUnit(this.unitInput.value);
  }

  removeUnit(unit: any) {
    console.log(unit);

    this.unitService.deleteUnit(unit);
  }
}
