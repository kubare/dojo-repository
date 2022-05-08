import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { LoginService } from 'src/app/auth/login/login.service';

@Component({
  selector: 'app-fav-ice-creams-user',
  templateUrl: './fav-ice-creams-user.component.html',
  styleUrls: ['./fav-ice-creams-user.component.css'],
})
export class FavIceCreamsUserComponent implements OnInit {
  public favsIceCreams$ = this.loginService.getFavIceCreams();
  favsIceCreamsSUB!: any;
  displayedColumns: string[] = ['favs'];

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.loginService.getFavIceCreams().subscribe((res) => {
      this.favsIceCreamsSUB = res;
    });

    console.log(this.favsIceCreamsSUB);
    console.log(this.favsIceCreams$);
  }
}
