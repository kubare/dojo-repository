import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
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
  unitInput = new FormControl('', [
    Validators.minLength(1),
    Validators.maxLength(5),
    Validators.required,
    Validators.pattern('^[1-9][0-9]*$'),
    Validators.min(1),
    Validators.max(30),
    this.noWhitespaceValidator,
  ]);
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

  addUnit() {
    this.unitInput.markAllAsTouched();
    if (this.unitInput.invalid) {
      return;
    }

    this.unitService.createUnit(this.unitInput.value);
  }

  removeUnit(unit: Unit) {
    this.unitService.deleteUnit(unit);
  }

  noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  ngOnDestroy(): void {
    this.getIdUnits.unsubscribe();
  }
}
