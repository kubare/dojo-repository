import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { LoginService } from 'src/app/auth/login/login.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit {
  user$ = this.auth.currentUser$;
  userRole$ = this.loginService.getUserRole();

  constructor(
    public auth: AuthService,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginService.setUserData().subscribe();
  }

  logout() {
    this.auth.logout().subscribe(() => {
      this.router.navigate(['login']);
    });
  }
}
