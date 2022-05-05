import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  user$ = this.auth.currentUser$;

  constructor(public auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  logout() {
    this.auth.logout().subscribe(() => {
      this.router.navigate(['login']);
    });
  }
}
