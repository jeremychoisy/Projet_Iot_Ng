import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AirportMapComponent} from './airport-map/airport-map.component';
import {ClientPageComponent} from './client-page/client-page.component';
import {ChartComponent} from './chart/chart.component';

const routes: Routes = [
  {path: '', redirectTo: 'client-page', pathMatch: 'full'},
  {path: 'client-page', component: ClientPageComponent},
  {path: 'airport-map', component: AirportMapComponent},
  {path: 'statistics', component: ChartComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
