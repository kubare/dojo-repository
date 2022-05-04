import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { map, Observable, switchMap, tap } from 'rxjs';
import { ApiService } from '../api.service';
import { ApiResponse } from '../navbar/navbar.component';

@Component({
  selector: 'app-season-list',
  templateUrl: './season-list.component.html',
  styleUrls: ['./season-list.component.css'],
})
export class SeasonListComponent implements OnInit {
  seasonDetails!: Observable<any>;

  constructor(private api: ApiService) {}

  ngOnInit(): void {}
}
