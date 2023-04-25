import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = '3f35ee9f4f217ab916227a1cba07392f';
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) { }

  getWeather(city: string) {
    const url = `${this.apiUrl}?q=${city}&appid=${this.apiKey}`;
    return this.http.get(url);
  }
}
