import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/auth/login/login.service';
import { IceCreamFavourtie } from 'src/app/store/user/user.state';
import { IceCreamService } from '../../admin/ice-creams/ice-cream.service';
import { IceCreamsUserService } from '../favourite-ice-cream.service';

@Component({
  selector: 'app-ice-creams-user',
  templateUrl: './ice-creams-user.component.html',
  styleUrls: ['./ice-creams-user.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IceCreamsUserComponent {
  public iceCreams$ = this.iceCreamService.getIceCreamsValueList();
  displayedColumns: string[] = ['name', 'fav'];
  favsIceCreams!: IceCreamFavourtie[];

  constructor(
    private iceCreamService: IceCreamService,
    private iceCreamUserService: IceCreamsUserService,
    private loginService: LoginService,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService
  ) {}

  addToFavorite(iceCream: IceCreamFavourtie) {
    this.loginService.getFavIceCreams().subscribe((res) => {
      this.favsIceCreams = res;
      this.cdr.detectChanges();
    });

    this.iceCreamUserService.addFavIceCreams(iceCream, this.favsIceCreams);
    this.toastr.success('Dodano do ulubionych!');
  }

  validateAddToFav(iceCream: IceCreamFavourtie) {
    this.loginService.getFavIceCreams().subscribe((res) => {
      this.favsIceCreams = res;
    });

    return (
      this.favsIceCreams.filter((item) => item.name === iceCream.name)
        .length === 0
    );
  }
}
