import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../utils/weather.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../utils/auth.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
  city!: string;
  weatherData: any[] | null = [];
  user_cities: string[] | null |undefined = [];

  private apiKey: string = '3f35ee9f4f217ab916227a1cba07392f';
  private apiUrl: string = 'https://api.openweathermap.org/data/2.5';

  constructor(
    private weatherService: WeatherService,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.cities$.subscribe((data: string[] | null) => {
      this.user_cities = data;
      console.log(this.user_cities);
      this.user_cities?.forEach((city) => {
        this.weatherService.getWeather(city).subscribe((data) => {
          this.weatherData?.push(data);
        });
      });
    });
  }

  getWeather(): void {
    this.weatherService.getWeather(this.city).subscribe((data) => {
      this.weatherData?.push(data);
      this.user_cities?.push(this.city);
      console.log(this.user_cities);
      this.city = '';
      this.authService.updateCities(this.user_cities)
    });
  }

  getForecast(city: string): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/forecast?q=${city}&appid=${this.apiKey}&units=metric`
    );
  }

  removeCity(index: number, city_name: string): void {
    this.weatherData?.splice(index, 1);
    this.user_cities=this.user_cities?.filter(e => e !== city_name);
    console.log(this.user_cities);
    this.authService.updateCities(this.user_cities)
  }
}
