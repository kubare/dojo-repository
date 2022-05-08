import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { LoginService } from 'src/app/auth/login/login.service';
import { IceCreamsUserService } from '../ice-creams-user/ice-creams-user.service';

@Component({
  selector: 'app-fav-ice-creams-user',
  templateUrl: './fav-ice-creams-user.component.html',
  styleUrls: ['./fav-ice-creams-user.component.css'],
})
export class FavIceCreamsUserComponent implements OnInit {
  public favsIceCreams$ = this.loginService.getFavIceCreams();
  favsIceCreamsSUB!: any;
  displayedColumns: string[] = ['favs', 'del'];

  constructor(
    private loginService: LoginService,
    private icus: IceCreamsUserService
  ) {}

  ngOnInit(): void {
    this.loginService.getFavIceCreams().subscribe((res) => {
      this.favsIceCreamsSUB = res;
    });

    console.log(this.favsIceCreamsSUB);
    console.log(this.favsIceCreams$);
  }

  deleteFromFavorite(name: string) {
    this.loginService.getFavIceCreams().subscribe((res) => {
      this.favsIceCreamsSUB = res;
    });
    this.icus.removeFavIceCreams({ name }, this.favsIceCreamsSUB);
  }
}
