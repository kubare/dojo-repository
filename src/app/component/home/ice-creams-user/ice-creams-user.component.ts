import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { LoginService } from 'src/app/auth/login/login.service';
import { AppState } from 'src/app/store/app.state';
import { UserActions } from 'src/app/store/user/user.actions';
import { IceCreamService } from '../../admin/ice-creams/ice-cream.service';
import { UnitsService } from '../../admin/units/units.service';
import { IceCreamsUserService } from './ice-creams-user.service';

@Component({
  selector: 'app-ice-creams-user',
  templateUrl: './ice-creams-user.component.html',
  styleUrls: ['./ice-creams-user.component.css'],
})
export class IceCreamsUserComponent {
  public iceCreams$ = this.iceCreamService.getIceCreamsList();
  displayedColumns: string[] = ['name', 'fav'];
  inputTest = new FormControl('');
  favsIceCreamsSUB!: string[];

  constructor(
    private iceCreamService: IceCreamService,
    private icus: IceCreamsUserService,
    private store: Store<AppState>,
    private loginService: LoginService
  ) {}

  addToFavorite(name: string) {
    this.loginService.getFavIceCreams().subscribe((res) => {
      this.favsIceCreamsSUB = res;
    });
    this.icus.addFavIceCreams({ name }, this.favsIceCreamsSUB);
  }

  // deleteFromFavorite(name: string) {
  //   this.loginService.getFavIceCreams().subscribe((res) => {
  //     this.favsIceCreamsSUB = res;
  //   });
  //   this.icus.removeFavIceCreams({ name }, this.favsIceCreamsSUB);
  // }
}
