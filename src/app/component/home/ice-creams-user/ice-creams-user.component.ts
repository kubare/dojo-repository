import { Component, OnInit } from '@angular/core';
import { IceCreamService } from '../../admin/ice-creams/ice-cream.service';

@Component({
  selector: 'app-ice-creams-user',
  templateUrl: './ice-creams-user.component.html',
  styleUrls: ['./ice-creams-user.component.css'],
})
export class IceCreamsUserComponent implements OnInit {
  public iceCreams$ = this.iceCreamService.getIceCreamsList();
  displayedColumns: string[] = ['name', 'fav'];

  constructor(private iceCreamService: IceCreamService) {}

  ngOnInit(): void {}
}
