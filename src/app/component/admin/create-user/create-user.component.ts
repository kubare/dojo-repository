import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/auth/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateUserComponent {
  createUserForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
  });

  constructor(private loginService: LoginService, private router: Router) {}

  createUserAccount() {
    const { email, password } = this.createUserForm.value;
    this.loginService.registerToSystem(email, password);
    this.router.navigate(['main']);
  }

  get email() {
    return this.createUserForm.get('email');
  }

  get password() {
    return this.createUserForm.get('password');
  }
}
