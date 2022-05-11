import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { last, Observable, Subject, Subscription } from 'rxjs';
import { LoginService } from 'src/app/auth/login/login.service';
import { IceCream } from 'src/app/models/ice-cream.model';
import { Unit } from 'src/app/models/units.model';
import { Order } from 'src/app/store/user/user.state';
import { IceCreamService } from '../../admin/ice-creams/ice-cream.service';
import { UnitsService } from '../../admin/units/units.service';
import { OrderService } from './order.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  orderList!: Order[];
  toggle: boolean = true;

  public iceCreams$: Observable<IceCream[]> =
    this.iceCreamService.getIceCreamsValueList();

  public favIceCreams$: Observable<IceCream[]> =
    this.loginService.getFavIceCreams();

  public units$: Observable<Unit[]> = this.unitService.getUnitsValueList();

  constructor(
    private fb: FormBuilder,
    private iceCreamService: IceCreamService,
    private unitService: UnitsService,
    private orderService: OrderService,
    private loginService: LoginService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.createForm();

    this.loginService.getUserOrder().subscribe((res) => {
      this.orderList = res;
    });
  }

  createForm() {
    this.form = this.fb.group({
      order: this.fb.array([this.iceCreamsForm()]),
    });
  }

  iceCreamsForm() {
    return this.fb.group({
      name: ['', Validators.required],
      value: ['', Validators.required],
    });
  }

  addNewIceCream() {
    this.orders.push(this.iceCreamsForm());
  }

  removeIceCream(i: Required<number>) {
    this.orders.removeAt(i);
  }

  createOrder() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }

    this.orderService.addOrder(this.form.value, this.orderList);
    this.router.navigate(['/main']);
    this.toastr.success('Złozono zamówienie!');
  }

  replaceOrder() {
    const lastElement = this.orderList[this.orderList.length - 1];

    this.orderService.addOrder(lastElement.order, this.orderList);
    this.router.navigate(['/main']);
    this.toastr.success('Złozono zamówienie!');
  }

  validateDate() {
    return (
      this.orderList
        .map((item) => item.date)
        .filter((date) => this.datesAreOnSameDay(new Date(date), new Date()))
        .length === 0
    );
  }

  datesAreOnSameDay(first: Date, second: Date) {
    return (
      first.getFullYear() === second.getFullYear() &&
      first.getMonth() === second.getMonth() &&
      first.getDate() === second.getDate()
    );
  }

  toggleSelect() {
    this.toggle = !this.toggle;
  }

  get orders() {
    return this.form.get('order') as FormArray;
  }
}
