import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const { email, password } = this.registerForm.value;
    this.http
      .post('http://localhost:3000/auth/register', { email, password })
      .subscribe(
        (response: any) => {
          this.router.navigate(['/']);
          this.snackBar.open(response.message, 'Close', { duration: 3000 });
        },
        (error) => {
          console.log('Error registering:', error);
          this.snackBar.open(error.error.message, 'Close', { duration: 3000 });
        }
      );
  }
}
