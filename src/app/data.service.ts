import { registerLocaleData } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ApiService } from './api.service';
import { ApiResponse } from './navbar/navbar.component';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  subjectAllSeasons = new BehaviorSubject<ApiResponse[]>([]);
  subjectOneSeason = new Subject<ApiResponse>();

  constructor(private api: ApiService) {
    this.initSeasons();
  }

  private initSeasons(): void {
    this.api.getSeasons().subscribe((data: ApiResponse[]) => {
      this.subjectAllSeasons.next(data);
    });
  }

  initSeasonById(id: number): void {
    this.api.getSeasonById(id).subscribe((data: ApiResponse) => {
      this.subjectOneSeason.next(data);
    });
  }
}
