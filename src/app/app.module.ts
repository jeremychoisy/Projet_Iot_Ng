import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {AgmCoreModule} from '@agm/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app.routing.module';
import {ClientPageComponent} from './client-page/client-page.component';
import {FormClientComponent} from './form-client/form-client.component';
import {DisplayClientComponent} from './display-client/display-client.component';
import {AirportMapComponent} from './airport-map/airport-map.component';
import {ChartComponent} from './chart/chart.component';
import {ChartsModule} from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    ClientPageComponent,
    FormClientComponent,
    DisplayClientComponent,
    AirportMapComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCyZlvP6hBkWH7AKttIegLBdXWSmxO06Ag'
    }),
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
