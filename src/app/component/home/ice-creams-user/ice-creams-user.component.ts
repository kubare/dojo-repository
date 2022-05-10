import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { LoginService } from 'src/app/auth/login/login.service';
import { IceCreamFavourtie } from 'src/app/store/user/user.state';
import { IceCreamService } from '../../admin/ice-creams/ice-cream.service';
import { IceCreamsUserService } from './ice-creams-user.service';

@Component({
  selector: 'app-ice-creams-user',
  templateUrl: './ice-creams-user.component.html',
  styleUrls: ['./ice-creams-user.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IceCreamsUserComponent {
  public iceCreams$ = this.iceCreamService.getIceCreamsValueList();
  displayedColumns: string[] = ['name', 'fav'];
  inputTest = new FormControl('');
  favsIceCreamsSUB!: IceCreamFavourtie[];

  constructor(
    private iceCreamService: IceCreamService,
    private icus: IceCreamsUserService,
    private loginService: LoginService,
    private cdr: ChangeDetectorRef
  ) {}

  addToFavorite(iceCream: IceCreamFavourtie) {
    this.loginService.getFavIceCreams().subscribe((res) => {
      this.favsIceCreamsSUB = res;
      this.cdr.detectChanges();
    });

    this.icus.addFavIceCreams(iceCream, this.favsIceCreamsSUB);
  }

  validateAddToFav(iceCream: IceCreamFavourtie) {
    this.loginService.getFavIceCreams().subscribe((res) => {
      this.favsIceCreamsSUB = res;
    });

    return (
      this.favsIceCreamsSUB.filter((item) => item.name === iceCream.name)
        .length === 0
    );
  }
}
