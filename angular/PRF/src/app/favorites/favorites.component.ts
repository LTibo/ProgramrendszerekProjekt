import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../utils/favorites.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  favoriteCities: any[] = [];
  newCityName: string ="";
  userEmail: string | null = localStorage.getItem('userEmail');

  constructor(private favoritesService: FavoritesService) {}

  ngOnInit(): void {
    this.fetchFavorites();
  }

  fetchFavorites() {
    this.favoritesService.getFavorites().subscribe((response) => {
      this.favoriteCities = response.favoriteCities;
    });
  }

  addFavorite(cityName: string) {
    this.favoritesService.addFavorite(cityName).subscribe(() => {
      this.fetchFavorites();
    });
  }

  removeFavorite(cityName: string) {
    this.favoritesService.removeFavorite(cityName).subscribe(() => {
      this.fetchFavorites();
    });
  }
}
