import { Component, OnInit } from '@angular/core';
import { AuthService } from './utils/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  userEmail: string | null = null;

  constructor(public authService: AuthService) {
    authService.user$.subscribe((email) => {
      this.userEmail = email;
    });
  }

  ngOnInit(): void {}

  onLogout() {
    this.authService.logout();
  }

}
