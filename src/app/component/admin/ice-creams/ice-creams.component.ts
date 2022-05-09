import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IceCream } from './ice-cream.model';
import { IceCreamService } from './ice-cream.service';

@Component({
  selector: 'app-ice-creams',
  templateUrl: './ice-creams.component.html',
  styleUrls: ['./ice-creams.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IceCreamsComponent implements OnInit {
  iceCreamInput = new FormControl('');
  iceCreams!: any[];

  displayedColumns: string[] = ['name', 'actions'];
  public iceCreams$ = this.iceCreamService.getIceCreamsList();

  constructor(private iceCreamService: IceCreamService) {}

  ngOnInit() {
    this.iceCreamService.getIceCreamsList().subscribe((data) => {
      this.iceCreams = data.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as any),
        };
      });
    });
  }

  addIceCream() {
    this.iceCreamService.createIceCreamProduct(this.iceCreamInput.value);
  }

  removeIceCream(iceCream: any) {
    this.iceCreamService.deleteIceCreamProduct(iceCream);
  }
}
