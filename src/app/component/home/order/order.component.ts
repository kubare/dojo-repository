import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
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
    if (this.validateDate()) {
      this.createForm();
    }
  }

  createForm() {
    this.form = this.fb.group({
      order: this.fb.array([this.ingredientsForm()]),
    });
  }

  ingredientsForm() {
    return this.fb.group({
      name: [null, Validators.required],
      value: [null, Validators.required],
    });
  }

  get orders() {
    return this.form.get('order') as FormArray;
  }

  addNewIngredient() {
    this.orders.push(this.ingredientsForm());
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
      console.log(this.orderList);
    });

    return (
      this.orderList
        .map((item) => item.date)
        .filter((date) => this.datesAreOnSameDay(new Date(date), new Date()))
        .length === 0
    );
  }

  datesAreOnSameDay(first: Date, second: Date) {
    console.log(first);
    console.log(second);

    return (
      first.getFullYear() === second.getFullYear() &&
      first.getMonth() === second.getMonth() &&
      first.getDate() === second.getDate()
    );
  }

  createOrder() {
    this.loginService.getUserOrder().subscribe((res) => {
      this.orderList = res;
      console.log(this.orderList);
    });

    this.orderService.addOrder(this.form.value, this.orderList);
    this.router.navigate(['/home']);
  }

  // repeatLastOrder() {
  //   this.loginService.getUserOrder().subscribe((res) => {
  //     this.orderList = res;
  //   });

  //   this.orderService.addFavIceCreams(this.orderList);
  //   alert('sukces');
  //   console.log(this.orderList);
  // }

  removeIngredient(i: Required<number>) {
    this.orders.removeAt(i);
  }

  toggleSelect() {
    this.toggle = !this.toggle;
  }
}
