import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../utils/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  users: any[] = [];

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.http.post('http://localhost:3000/auth/users', {"user": localStorage.getItem("userEmail")}).subscribe(
      (response: any) => {

        this.users = response;
      },
      (error) => {
        console.log('Error loading users:', error);
      }
    );
  }

  deleteUser(userId: string) {
    this.http.delete(`http://localhost:3000/auth/userdel/${userId}`).subscribe(
      (response) => {
        this.loadUsers();
      },
      (error) => {
        console.log('Error deleting user:', error);
      }
    );
  }
}
