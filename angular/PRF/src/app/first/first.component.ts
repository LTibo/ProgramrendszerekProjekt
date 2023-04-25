import { Component } from '@angular/core';
import { ConnectionService } from '../utils/connection.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.scss']
})
export class FirstComponent {
  constructor(private connectionService: ConnectionService, private router: Router) {

  }


  title = 'PRF';

  goToRegistration(){
    this.router.navigate(['/registration']);
  }

  hello() {
    console.log('Hello World!');

    if (this.title === 'PRF') {
      this.title = 'NOT PRF';
    }
    else{
      this.title = 'PRF';
    }
    /*this.connectionService.greet().subscribe(data => {
      console.log('This came from the server: ', data);
    }, error => {
      console.log('Sorry we encountered an error: ', error);
    });*/

    this.connectionService.greet().subscribe({
      next: (v) => console.log('This came from the server: ', v),
      error: (e) => console.error('Sorry we encountered an error: ',e),
      complete: () => console.info('complete')
  })
  }
}
