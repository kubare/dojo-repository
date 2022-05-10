import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from 'src/app/auth/login/login.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements OnInit {
  createUserForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  });

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {}

  createUserAccount() {
    const { email, password } = this.createUserForm.value;
    this.loginService.registerToSystem(email, password);
  }
}
