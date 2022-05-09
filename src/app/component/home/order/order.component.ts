import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { last, Observable, Subject } from 'rxjs';
import { LoginService } from 'src/app/auth/login/login.service';
import { Order } from 'src/app/store/user/user.state';
import { IceCreamService } from '../../admin/ice-creams/ice-cream.service';
import { UnitsService } from '../../admin/units/units.service';
import { OrderService } from './order.service';

interface IceCream {
  name: string;
}

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  orderList!: Order[];
  toggle: boolean = true;

  public iceCreams$: Observable<any[]> =
    this.iceCreamService.getIceCreamsValueList();

  public favIceCreams$: Observable<any[]> = this.loginService.getFavIceCreams();

  public units$: Observable<any[]> = this.unitService.getUnitsValueList();

  constructor(
    private fb: FormBuilder,
    private iceCreamService: IceCreamService,
    private unitService: UnitsService,
    private orderService: OrderService,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      order: this.fb.array([this.iceCreamsForm()]),
    });
  }

  iceCreamsForm() {
    return this.fb.group({
      name: [null, Validators.required],
      value: [null, Validators.required],
    });
  }

  get orders() {
    return this.form.get('order') as FormArray;
  }

  addNewIceCream() {
    this.orders.push(this.iceCreamsForm());
  }

  validateForm() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
  }

  validateDate() {
    this.loginService.getUserOrder().subscribe((res) => {
      this.orderList = res;
    });

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

  createOrder() {
    this.loginService.getUserOrder().subscribe((res) => {
      this.orderList = res;
    });

    this.orderService.addOrder(this.form.value, this.orderList);
    this.router.navigate(['/main']);
  }

  replaceOrder() {
    this.loginService.getUserOrder().subscribe((res) => {
      this.orderList = res;
    });
    console.log(this.orderList);

    const lastElement = this.orderList[this.orderList.length - 1];
    // const newDate = new Date();
    // const replaceNewOrder = {
    //   ...lastElement,
    //   date: newDate.toLocaleDateString('en-US'),
    // };

    // const sortResult = this.orderList.sort(function (a, b) {
    //   const c = new Date(a.date);
    //   const d = new Date(b.date);
    //   return d.getTime() - c.getTime();
    // });

    this.orderService.addOrder(lastElement.order, this.orderList);
    this.router.navigate(['/main']);
  }

  removeIceCream(i: Required<number>) {
    this.orders.removeAt(i);
  }

  toggleSelect() {
    this.toggle = !this.toggle;
  }
}
