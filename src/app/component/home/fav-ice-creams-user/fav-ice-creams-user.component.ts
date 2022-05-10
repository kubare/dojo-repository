import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { map, Subscription } from 'rxjs';
import { LoginService } from 'src/app/auth/login/login.service';
import { IceCreamFavourtie } from 'src/app/store/user/user.state';
import { IceCreamsUserService } from '../favourite-ice-cream.service';

@Component({
  selector: 'app-fav-ice-creams-user',
  templateUrl: './fav-ice-creams-user.component.html',
  styleUrls: ['./fav-ice-creams-user.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavIceCreamsUserComponent {
  public favsIceCreams$ = this.loginService.getFavIceCreams();
  favsIceCreams!: IceCreamFavourtie[];
  displayedColumns: string[] = ['favs', 'del'];

  constructor(
    private loginService: LoginService,
    private iceCreamUserService: IceCreamsUserService
  ) {}

  deleteFromFavorite(iceCream: IceCreamFavourtie) {
    this.loginService.getFavIceCreams().subscribe((res) => {
      this.favsIceCreams = res;
    });
    this.iceCreamUserService.removeFavIceCreams(iceCream, this.favsIceCreams);
  }
}
