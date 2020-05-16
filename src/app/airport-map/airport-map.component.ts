import {Component} from '@angular/core';

@Component({
  selector: 'app-airport-map',
  templateUrl: './airport-map.component.html',
  styleUrls: ['./airport-map.component.css']
})
export class AirportMapComponent {
  lat = 43.6650573;
  lng = 7.212535;
  zoom = 19;
  constructor() {
  }
}
