import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { LoginService } from 'src/app/auth/login/login.service';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  user$ = this.auth.currentUser$;
  userRole$ = this.loginService.getUserRole();
  roleUser: any;

  constructor(
    public auth: AuthService,
    private loginService: LoginService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.loginService.setUserData().subscribe((x) => {
      this.roleUser = x?.role;
      console.log('log from fn');

      console.log(this.roleUser);
    });
    console.log(this.roleUser);
  }

  logout() {
    this.auth.logout().subscribe(() => {
      this.router.navigate(['login']);
    });
  }

  moveToAdmin() {
    this.router.navigate(['admin']);
    console.log(this.roleUser);
  }
}
