import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UnitsService } from './units.service';

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.css'],
})
export class UnitsComponent {
  unitInput = new FormControl('');
  displayedColumns: string[] = ['unit', 'actions'];
  public units$ = this.unitService.getUnitsList();

  constructor(private unitService: UnitsService) {}

  addIceCream() {
    this.unitService.createUnit(this.unitInput.value);
  }

  removeIceCream(unit: any) {
    this.unitService.deleteUnit(unit);
  }
}
