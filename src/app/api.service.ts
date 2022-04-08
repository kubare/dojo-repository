import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  public getInformation() {
    return this.http.get<any>('https://api.chucknorris.io/jokes/random');
    // ,
    // {
    //   // headers: {
    //   //   'Content-Type': 'text/plain;charset=UTF-8',
    //   // },
    //   responseType: 'text' as any,
    // });
  }

  public chooseCategory(enteredText: string) {
    return this.http.get<any>(
      `https://api.chucknorris.io/jokes/random?category=${enteredText}`
    );
  }
}
