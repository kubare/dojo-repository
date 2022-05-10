import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { User } from 'firebase/auth';
import { map, Observable, switchMap } from 'rxjs';
import { UserState } from 'src/app/store/user/user.state';
import { IceCream } from '../../ice-creams/ice-cream.model';
import { IceCreamService } from '../../ice-creams/ice-cream.service';
import { UserListService } from '../user-list/user-list.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserOrdersComponent {
  toggle: boolean = true;
  public users$: Observable<UserState[]> = this.userListService.getUsersList();
  public iceCreams$: Observable<IceCream[]> =
    this.iceCreamService.getIceCreamsValueList();
  displayedColumns: string[] = ['email', 'order'];

  allIceCreams!: Observable<IceCream[]>;
  allUsers$!: Observable<UserState[]>;

  constructor(
    private userListService: UserListService,
    private iceCreamService: IceCreamService
  ) {}

  toggleSelect() {
    this.toggle = !this.toggle;
  }

  sumOrdersValue() {
    // this.iceCreamService.getIceCreamsValueList().subscribe((res) => {
    //   this.allIceCreams = res;
    //   console.log(this.allIceCreams);
    // });
    // console.log(this.allIceCreams);
    // this.allIceCreams.forEach((iceCream) => {
    //   this.sumOrderIceCreamValue(iceCream.name);
    //   console.log(iceCream.name);
    //   console.log(this.sumOrderIceCreamValue(iceCream.name));
    // });
  }

  // this.allIceCreams.forEach((iceCream) => {
  //   this.sumOrderIceCreamValue(iceCream.name);

  //   console.log(iceCream.name);
  //   console.log(this.sumOrderIceCreamValue(iceCream.name));
  // });

  sumOrderIceCreamValue(iceCreamName: string) {
    // this.allUsers$ = this.userListService
    //   .getUsersList()
    //   .pipe(
    //     map((users) =>
    //       users
    //         .map((user) => user.orders)
    //         .filter((orderWithDate) => this.datesAreOnSameDay(new Date(orderWithDate.date), new Date()))
    //     )
    //   );
    // .map((item) => item.orders)
    // .filter((orderWithDate) =>
    //   this.datesAreOnSameDay(new Date(orderWithDate.date), new Date())
    // )
    // .flatMap((order) => order.order)
    // .filter((name) => name.name === iceCreamName)
    // .map((order) => order.value)
    // .reduce((total, num) => {
    //   total + num;
  }

  datesAreOnSameDay(first: Date, second: Date) {
    return (
      first.getFullYear() === second.getFullYear() &&
      first.getMonth() === second.getMonth() &&
      first.getDate() === second.getDate()
    );
  }
}
