import { Component } from '@angular/core';
import { UserService } from '../utils/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
    user = {
      username: '',
      email: '',
      password: ''
    };

    constructor(private userService: UserService) {}

    onSubmit() {
      this.userService.register(this.user).subscribe({
        next: (r) => console.log(r),
        error: (e) => console.log(e)
    });
    }
  }
