import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserListService } from '../user-list/user-list.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css'],
})
export class UserOrdersComponent implements OnInit {
  toggle: boolean = true;
  public users$: Observable<any> = this.userListService.getUsersList();
  displayedColumns: string[] = ['email', 'order'];

  constructor(private userListService: UserListService) {}

  ngOnInit(): void {}

  toggleSelect() {
    this.toggle = !this.toggle;
  }
}
