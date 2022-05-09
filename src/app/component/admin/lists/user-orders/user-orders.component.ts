import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IceCream } from '../../ice-creams/ice-cream.model';
import { IceCreamService } from '../../ice-creams/ice-cream.service';
import { UserListService } from '../user-list/user-list.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css'],
})
export class UserOrdersComponent implements OnInit {
  toggle: boolean = true;
  public users$: Observable<any> = this.userListService.getUsersList();
  public iceCreams$: Observable<any> =
    this.iceCreamService.getIceCreamsValueList();
  displayedColumns: string[] = ['email', 'order'];
  allIceCreams!: any[];
  allUsers!: any[];

  constructor(
    private userListService: UserListService,
    private iceCreamService: IceCreamService
  ) {}

  ngOnInit(): void {
    console.log(this.iceCreams$);
    console.log(this.allIceCreams);
  }

  toggleSelect() {
    this.toggle = !this.toggle;
  }

  // async sumOrdersValue() {
  //   const result = await this.iceCreamService.getIceCreamsValueList().toPromise()
  //     this.allIceCreams = result;
  //     this.allIceCreams.forEach((iceCream) => {
  //       this.sumOrderIceCreamValue(iceCream.name);

  //       console.log(iceCream.name);
  //       console.log(this.sumOrderIceCreamValue(iceCream.name));
  //     });
  //   }

  //   this.allIceCreams.forEach((iceCream) => {
  //     this.sumOrderIceCreamValue(iceCream.name);

  //     console.log(iceCream.name);
  //     console.log(this.sumOrderIceCreamValue(iceCream.name));
  //   });
  // }

  // sumOrderIceCreamValue(iceCreamName: string) {
  //   this.userListService.getUsersList().subscribe((res) => {
  //     this.allUsers = res;
  //   });

  //   return this.allUsers
  //     .map((item) => item.orders)
  //     .filter((orderWithDate) =>
  //       this.datesAreOnSameDay(new Date(orderWithDate.date), new Date())
  //     )
  //     .flatMap((order) => order.order)
  //     .filter((name) => name.name === iceCreamName)
  //     .map((order) => order.value)
  //     .reduce((total, num) => {
  //       total + num;
  //     });
  // }

  // datesAreOnSameDay(first: Date, second: Date) {
  //   return (
  //     first.getFullYear() === second.getFullYear() &&
  //     first.getMonth() === second.getMonth() &&
  //     first.getDate() === second.getDate()
  //   );
  // }
}
