import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) {}

  ngOnInit(): void {}

  onSubmit() {
    const { email, password } = this.loginForm.value;
    this.http
      .post('http://localhost:3000/auth/login', { email, password })
      .subscribe(
        (response:any) => {
          this.router.navigate(['/']);
          this.snackBar.open(response.message, 'Close', { duration: 3000 });
        },
        (error) => {
          console.log('Error logging in:', error);
          this.snackBar.open(error.error.message, 'Close', { duration: 3000 });
        }
      );
  }
}
