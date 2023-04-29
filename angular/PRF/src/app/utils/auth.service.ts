import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<string | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      this.userSubject.next(storedEmail);
    }
  }

  login(email: any, password: any) {
    return this.http.post('http://localhost:3000/auth/login', { email, password }).subscribe({
      next: (response: any) => {
        this.userSubject.next(email);
        localStorage.setItem('userEmail', email);
        this.router.navigate(['/']);
        this.snackBar.open(response.message, 'Close', { duration: 3000 });
      },
      error: (error) => {
        console.log('Error logging in:', error);
        this.snackBar.open(error.error.message, 'Close', { duration: 3000 });
      }
  });
  }

  register(email: any, password: any) {
    return this.http.post('http://localhost:3000/auth/register', { email, password }).subscribe({
      next: (response: any) => {
        this.userSubject.next(email);
        localStorage.setItem('userEmail', email);
        this.router.navigate(['/']);
        this.snackBar.open(response.message, 'Close', { duration: 3000 });
      },
      error: (error) => {
        console.log('Error registering:', error);
        this.snackBar.open(error.error.message, 'Close', { duration: 3000 });
      }
  });
  }

  logout() {
    return this.http.post('http://localhost:3000/auth/logout', {}).subscribe({
      next: (response: any) => {
        this.userSubject.next(null);
        localStorage.removeItem('userEmail');
        this.router.navigate(['/']);
        this.snackBar.open(response.message, 'Close', { duration: 3000 });
      },
      error: (error) => {
        console.log('Error logging out:', error);
        this.snackBar.open(error.error.message, 'Close', { duration: 3000 });
      }
  });
  }
}
