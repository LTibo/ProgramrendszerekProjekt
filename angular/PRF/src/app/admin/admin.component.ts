import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  users: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.http.get('/users').subscribe(
      (response: any) => {
        this.users = response;
      },
      (error) => {
        console.log('Error loading users:', error);
      }
    );
  }

  deleteUser(userId: string) {
    this.http.delete(`/users/${userId}`).subscribe(
      (response) => {
        this.loadUsers();
      },
      (error) => {
        console.log('Error deleting user:', error);
      }
    );
  }
}
