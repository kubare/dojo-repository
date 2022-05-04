import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { TweetComponent } from './tweet/tweet.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule, Routes } from '@angular/router';
import { SeasonListComponent } from './season-list/season-list.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: '', redirectTo: 'seasons', pathMatch: 'full' },
  {
    path: 'seasons',
    component: NavbarComponent,
  },
  {
    path: 'season/:id',
    component: SeasonListComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    TweetComponent,
    NavbarComponent,
    SeasonListComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
