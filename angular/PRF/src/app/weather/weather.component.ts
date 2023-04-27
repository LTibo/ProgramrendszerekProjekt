import { Component } from '@angular/core';
import { WeatherService } from '../utils/weather.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent {
  city!: string;
  weatherData: any[] = [];

  private apiKey: string = '3f35ee9f4f217ab916227a1cba07392f';
  private apiUrl: string = 'https://api.openweathermap.org/data/2.5';

  constructor(private weatherService: WeatherService, private http:HttpClient) {}

  getWeather(): void {
    this.weatherService.getWeather(this.city).subscribe((data) => {
      this.weatherData.push(data);
      this.city = '';
    });
  }

  getForecast(city: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/forecast?q=${city}&appid=${this.apiKey}&units=metric`);
  }

  removeCity(index: number): void {
    this.weatherData.splice(index, 1);
  }
}
