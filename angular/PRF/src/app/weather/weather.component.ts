import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../utils/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  city = '';
  weatherData: any;

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
  }

  getWeather() {
    this.weatherService.getWeather(this.city).subscribe((data) => {
      this.weatherData = data;
      console.log(this.weatherData);
    });
  }
}
