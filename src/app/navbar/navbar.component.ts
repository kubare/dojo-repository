import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

export interface ApiResponse {
  season: string;
  episode: number;
  results: any[];
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  rickMortySeasons!: any;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {}
}
