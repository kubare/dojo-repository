import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { map, Observable, Subscription, switchMap } from 'rxjs';
import { UserState } from 'src/app/store/user/user.state';
import { IceCream } from '../../../../models/ice-cream.model';
import { IceCreamService } from '../../ice-creams/ice-cream.service';
import { UserListService } from '../user-list/user-list.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserOrdersComponent implements OnInit, OnDestroy {
  toggleButton: boolean = true;
  public users$: Observable<UserState[]> = this.userListService.getUsersList();
  public iceCreams$: Observable<IceCream[]> =
    this.iceCreamService.getIceCreamsValueList();
  displayedColumns: string[] = ['email', 'order'];

  allIceCreamsValue = new Map<string, number>();
  allIceCreams!: IceCream[];
  unSubFromFn!: Subscription;
  unSubFromInit!: Subscription;

  constructor(
    private userListService: UserListService,
    private iceCreamService: IceCreamService
  ) {}

  ngOnInit(): void {
    this.unSubFromInit = this.iceCreamService
      .getIceCreamsValueList()
      .subscribe((res) => {
        this.allIceCreams = res;

        this.allIceCreams.forEach((element) => {
          this.sumOrderIceCreamValue(element.name);
        });
      });
  }

  toggleSelect() {
    this.toggleButton = !this.toggleButton;
  }

  sumOrderIceCreamValue(iceCreamName: string) {
    return (this.unSubFromFn = this.userListService
      .getUsersList()
      .pipe(
        map((users) => {
          return users
            .filter((user) => user.role === 'user')
            .flatMap((user) => {
              return user.orders;
            })
            .filter((orderWithDate) => {
              return this.datesAreOnSameDay(
                new Date(orderWithDate.date),
                new Date()
              );
            })
            .flatMap((singleOrder) => singleOrder.order)
            .filter((orderName) => {
              return orderName.name === iceCreamName;
            })
            .map((order) => {
              return parseInt(order.value);
            })
            .reduce((total, num) => {
              return total + num;
            }, 0);
        })
      )
      .subscribe((res) => this.allIceCreamsValue.set(iceCreamName, res)));
  }

  datesAreOnSameDay(first: Date, second: Date) {
    return (
      first.getFullYear() === second.getFullYear() &&
      first.getMonth() === second.getMonth() &&
      first.getDate() === second.getDate()
    );
  }

  ngOnDestroy(): void {
    this.unSubFromFn.unsubscribe();
    this.unSubFromInit.unsubscribe();
  }
}
