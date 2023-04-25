import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstComponent } from './first/first.component';
import { SecondComponent } from './second/second.component';
import { ErrorComponent } from './error/error.component';
import { RegistrationComponent } from './registration/registration.component';
import { WeatherComponent } from './weather/weather.component';

const routes: Routes = [
  {path: '', redirectTo: 'first', pathMatch: 'full'},
  {path: 'first', component: FirstComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'weather', component: WeatherComponent},
  {path: 'second/:id', component: SecondComponent},
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
