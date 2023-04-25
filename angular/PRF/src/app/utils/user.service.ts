import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  register(user: object) {
    console.log(user);
    return this.http.post(this.apiUrl, user);
  }
}
