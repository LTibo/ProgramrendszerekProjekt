import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../utils/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  city = '';
  icon = '';
  weatherData: any;

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
  }

  getWeather() {
    this.weatherService.getWeather(this.city).subscribe({
      next: (data) => {
      this.weatherData = data;
      this.setIcon();
      console.log(this.weatherData);
    },
      error: (e) => {console.log(e)}}
  )}

  setIcon() {
    const temp = this.weatherData.main.temp - 273.15;
    if (temp < 10) {
      this.icon = 'snowflake';
    } else if (temp >= 10 && temp < 20) {
      this.icon = 'cloud-sun';
    } else {
      this.icon = 'sun';
    }
  }

}
