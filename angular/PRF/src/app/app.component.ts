import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PRF';

  hello() {
    console.log('Hello World!');

    if (this.title === 'PRF') {
      this.title = 'NOT PRF';
    }
    else{
      this.title = 'PRF';
    }
  }
}
