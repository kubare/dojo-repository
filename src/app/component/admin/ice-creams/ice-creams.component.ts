import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { IceCream } from '../../../models/ice-cream.model';
import { IceCreamService } from './ice-cream.service';

@Component({
  selector: 'app-ice-creams',
  templateUrl: './ice-creams.component.html',
  styleUrls: ['./ice-creams.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IceCreamsComponent implements OnInit, OnDestroy {
  iceCreams!: IceCream[];
  displayedColumns: string[] = ['name', 'actions'];
  iceCreamInput = new FormControl('', [
    Validators.minLength(3),
    Validators.maxLength(20),
    Validators.required,
    Validators.pattern('^[A-Z]+[a-zA-Z]*$'),
    this.noWhitespaceValidator,
  ]);
  getIdIceCream!: Subscription;

  public iceCreams$ = this.iceCreamService.getIceCreamsValueList();

  constructor(private iceCreamService: IceCreamService) {}

  ngOnInit() {
    this.getIdIceCream = this.iceCreamService
      .getIceCreamsList()
      .subscribe((data) => {
        this.iceCreams = data.map((e) => {
          return {
            id: e.payload.doc.id,
            ...(e.payload.doc.data() as IceCream),
          };
        });
      });
  }

  addIceCream() {
    this.iceCreamInput.markAllAsTouched();
    if (this.iceCreamInput.invalid) {
      return;
    }

    this.iceCreamService.createIceCreamProduct(this.iceCreamInput.value);
  }

  removeIceCream(iceCream: IceCream) {
    this.iceCreamService.deleteIceCreamProduct(iceCream);
  }

  noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  ngOnDestroy(): void {
    this.getIdIceCream.unsubscribe();
  }
}
