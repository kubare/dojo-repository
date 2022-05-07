import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { LoginService } from 'src/app/auth/login/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  user$ = this.auth.currentUser$;
  roleUser: any;

  constructor(
    public auth: AuthService,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginService.getUserRole().pipe(
      map((role: any) => {
        this.roleUser = role;
        console.log(this.roleUser);
      })
    );
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
