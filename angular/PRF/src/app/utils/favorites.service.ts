import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  constructor(private http: HttpClient) {}

  getFavorites() {
    return this.http.get<any>('http://localhost:3000/auth/getfavorites');
  }

  addFavorite(cityName: string) {
    const userEmail = localStorage.getItem('userEmail');
    return this.http.post('http://localhost:3000/auth/addfavorites', { userEmail, cityName });
  }

  removeFavorite(cityName: string) {
    const userEmail = localStorage.getItem('userEmail');
    return this.http.delete('http://localhost:3000/auth/delfavorites', { body: { userEmail, cityName } });
  }
}
