import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { DataService } from './data.service';

export interface ApiResponse {
  id?: number;
  season: string;
  results: any[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  rickMortySeasons!: any;
  season!: ApiResponse;

  constructor(private dataService: DataService, private api: ApiService) {}

  ngOnInit(): void {
    this.getAllSeasons();
  }

  getAllSeasons() {
    this.dataService.subjectAllSeasons.subscribe(
      (data: ApiResponse[]) => (
        (this.rickMortySeasons = data), console.log(this.rickMortySeasons)
      )
    );
  }

  chooseOption(id: number) {
    this.dataService.initSeasonById(id);

    this.dataService.subjectOneSeason.subscribe((data: ApiResponse) => {
      this.season = data;
    });
  }
}
