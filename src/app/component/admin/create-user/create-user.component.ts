import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from 'src/app/auth/login/login.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateUserComponent {
  createUserForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  });

  constructor(private loginService: LoginService) {}

  createUserAccount() {
    const { email, password } = this.createUserForm.value;
    this.loginService.registerToSystem(email, password);
  }
}
