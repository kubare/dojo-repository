import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/auth/login/login.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent implements OnInit {
  public orderList$: Observable<any> = this.loginService.getUserOrder();

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {}
}
