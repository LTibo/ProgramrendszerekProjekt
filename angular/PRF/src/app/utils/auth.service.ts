import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, empty } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

const ERROR_REGEX = /(?<=<pre>)(.*?)(?=<\/pre>)/

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<string | null>(null);
  user$ = this.userSubject.asObservable();

  private accessLevelSubject = new BehaviorSubject<number | null>(null);
  accessLevel$ = this.accessLevelSubject.asObservable();

  private citiesSubject = new BehaviorSubject<[] | null>(null);
  cities$ = this.citiesSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      this.userSubject.next(storedEmail);
    }
  }

  login(email: any, password: any) {
    return this.http
      .post('http://localhost:3000/auth/login', { email, password })
      .subscribe({
        next: (response: any) => {
          this.userSubject.next(email);
          localStorage.setItem('userEmail', email);
          this.accessLevelSubject.next(response.accessLevel);
          localStorage.setItem("accessLevel",response.accessLevel);
          this.citiesSubject.next(response.cities);
          this.router.navigate(['/']);
          this.snackBar.open(response.message, 'Close', { duration: 3000 });
        },
        error: (error) => {
          const [errorMsg] = (error.error as string).match(ERROR_REGEX) ?? ["Unknown error"]
          // console.log('Error logging in:',matchResult)

          this.snackBar.open(errorMsg, 'Close', { duration: 3000 });
        },
      });
  }

  register(email: any, password: any) {
    return this.http
      .post('http://localhost:3000/auth/register', { email, password })
      .subscribe({
        next: (response: any) => {
          this.userSubject.next(email);
          localStorage.setItem('userEmail', email);
          this.accessLevelSubject.next(response.accessLevel);
          localStorage.setItem("accessLevel",response.accessLevel);
          this.citiesSubject.next(response.cities);
          this.router.navigate(['/']);
          this.snackBar.open(response.message, 'Close', { duration: 3000 });
        },
        error: (error) => {
          console.log('Error registering:', error);
          this.snackBar.open(error.error.message, 'Close', { duration: 3000 });
        },
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
      },
    });
  }

  updateCities(cities: string[] |null |undefined) {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      return;
    }
    this.http
    .post('http://localhost:3000/auth/update-cities', { email: userEmail, cities })
    .subscribe({
      next: (response: any) => {
        this.snackBar.open(response.message, 'Close', { duration: 3000 });
      },
      error: (error) => {
        this.snackBar.open(error.error.message, 'Close', { duration: 3000 });
      },
    });
  }

}
