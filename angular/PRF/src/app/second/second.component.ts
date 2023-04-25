import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.scss']
})
export class SecondComponent {
  constructor(private route: ActivatedRoute){}

  message = '';

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (p) => {
        console.log(p.keys);
        console.log(p.get('message'));
        this.message = p.get('id') + '  '+ p.get('message')},
      error: (err) => console.log(err)})
  }
}
