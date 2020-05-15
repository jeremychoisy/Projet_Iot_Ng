import {Component} from '@angular/core';


export interface Client {
  firstName: string;
  lastName: string;
  macAddress: string;
  flightNumber: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'projet-iot-app';

}
