import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { RegistrationComponent } from './registration/registration.component';
import { WeatherComponent } from './weather/weather.component';
import { ForecastComponent } from './forecast/forecast.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { AuthGuard } from './auth.guard';
import { FavGuard } from './fav.guard';

const routes: Routes = [
  {path: '', redirectTo: 'weather', pathMatch: 'full'},
  {path: 'weather', component: WeatherComponent},
  { path: 'forecast/:city', component: ForecastComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'favorites', component: FavoritesComponent, canActivate: [FavGuard] },
  { path: 'admin', component: AdminComponent,  canActivate: [AuthGuard] },

  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
