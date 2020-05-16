import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {AgmCoreModule} from '@agm/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app.rounting.module';
import {ClientPageComponent} from './client-page/client-page.component';
import {FormClientComponent} from './form-client/form-client.component';
import {DisplayClientComponent} from './display-client/display-client.component';
import {AirportMapComponent} from './airport-map/airport-map.component';
import {ClientStatComponent} from './client-stat/client-stat.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientPageComponent,
    FormClientComponent,
    DisplayClientComponent,
    AirportMapComponent,
    ClientStatComponent
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
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
