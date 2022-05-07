import { Component, OnInit } from '@angular/core';
import { UserListService } from './user-list.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent {
  public users$ = this.userListService.getUsersList();
  displayedColumns: string[] = ['id', 'email', 'role'];

  constructor(private userListService: UserListService) {}
}
