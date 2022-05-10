import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/auth/login/login.service';
import { Order } from 'src/app/store/user/user.state';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderListComponent {
  public orderList$: Observable<Order[]> = this.loginService.getUserOrder();

  constructor(private loginService: LoginService) {}
}
