import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  information: any;
  chooseOption = new FormControl(null);
  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getInformation().subscribe((val) => {
      this.information = val.value;
      console.log(this.information);
    });
  }

  // chooseCategory() {
  //   this.api
  //     .chooseCategory(this.chooseOption.value)
  //     .subscribe((item) => (this.information = item));
  // }
}
