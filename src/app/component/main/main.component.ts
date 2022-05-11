import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { LoginService } from 'src/app/auth/login/login.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit, OnDestroy {
  user$ = this.auth.currentUser$;
  userRole$ = this.loginService.getUserRole();
  setUserData!: Subscription;

  constructor(
    public auth: AuthService,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.setUserData = this.loginService.setUserData().subscribe();
  }

  logout() {
    this.auth.logout().subscribe(() => {
      this.router.navigate(['login']);
      window.location.reload();
    });
  }

  ngOnDestroy(): void {
    this.setUserData.unsubscribe();
  }
}
