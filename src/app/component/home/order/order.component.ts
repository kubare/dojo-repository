import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { LoginService } from 'src/app/auth/login/login.service';
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
  orderList!: string[];

  public iceCreams$: Observable<any[]> =
    this.iceCreamService.getIceCreamsList();

  public units$: Observable<any[]> = this.unitService.getUnitsList();

  constructor(
    private fb: FormBuilder,
    private iceCreamService: IceCreamService,
    private unitService: UnitsService,
    private orderService: OrderService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.createForm();
    console.log(this.form);
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

  createOrder() {
    this.loginService.getUserOrder().subscribe((res) => {
      this.orderList = res;
    });
    this.orderService.addFavIceCreams(this.form.value);
    console.log(this.form.value);
    console.log(this.orderList);
  }

  removeIngredient(i: Required<number>) {
    this.orders.removeAt(i);
  }
}
