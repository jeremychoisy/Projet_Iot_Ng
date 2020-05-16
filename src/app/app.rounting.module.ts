import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AirportMapComponent} from './airport-map/airport-map.component';
import {ClientStatComponent} from './client-stat/client-stat.component';
import {ClientPageComponent} from './client-page/client-page.component';

const routes: Routes = [
  {path: '', redirectTo: 'client-page', pathMatch: 'full'},
  {path: 'client-page', component: ClientPageComponent},
  {path: 'airport-map', component: AirportMapComponent},
  {path: 'client-stat', component: ClientStatComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
