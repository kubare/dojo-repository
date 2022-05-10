import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnDestroy {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  login!: Subscription;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private toast: HotToastService
  ) {}

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  submit() {
    if (!this.loginForm.valid) {
      return;
    }

    const { email, password } = this.loginForm.value;
    this.login = this.loginService
      .loginToSystem(email, password)
      .pipe(
        this.toast.observe({
          success: 'Zalogowano poprawnie',
          loading: 'Loguje...',
          error: 'Niepoprawne dane',
        })
      )
      .subscribe((user) => {
        this.loginService.setUserID(user.user!.uid);
        this.router.navigate(['main']);
      });
  }

  ngOnDestroy(): void {
    this.login.unsubscribe();
  }
}
