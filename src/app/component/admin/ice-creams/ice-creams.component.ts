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
    Validators.required,
  ]);
  getIdIceCream!: Subscription;

  public iceCreams$ = this.iceCreamService.getIceCreamsList();

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
    this.iceCreamService.createIceCreamProduct(this.iceCreamInput.value);
  }

  removeIceCream(iceCream: IceCream) {
    this.iceCreamService.deleteIceCreamProduct(iceCream);
  }

  ngOnDestroy(): void {
    this.getIdIceCream.unsubscribe();
  }
}
