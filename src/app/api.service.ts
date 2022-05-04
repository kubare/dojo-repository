import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from './navbar/navbar.component';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  public getSeasons(): Observable<ApiResponse[]> {
    return this.http.get<ApiResponse[]>('http://localhost:3000/episodes');
  }

  public getSeasonById(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>('http://localhost:3000/episodes/' + id);
  }
}
