import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from '../utils/weather.service';

interface ForecastData {
  list: any[];
}

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss'],
})
export class ForecastComponent implements OnInit {
  city: string;
  forecastData!: ForecastData;

  constructor(private route: ActivatedRoute, private weatherService: WeatherService) {
    this.city = this.route.snapshot.params['city'];
  }

  ngOnInit(): void {
    this.weatherService.getForecast(this.city).subscribe((data: ForecastData) => {
      this.forecastData = data;
    });
  }
}
