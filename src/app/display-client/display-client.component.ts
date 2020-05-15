import {Component, OnInit} from '@angular/core';
import {Client} from '../app.component';
import {DisplayClientService} from './display-client.service';

@Component({
  selector: 'app-display-client',
  templateUrl: './display-client.component.html',
  styleUrls: ['./display-client.component.css']
})

export class DisplayClientComponent implements OnInit {

  clientList: Client[] = [];

  constructor(private displayClientService: DisplayClientService) {
  }

  ngOnInit(): void {
    console.log('Oui Jeremy j\'ai mis un console.log je suis pas non plus comme les 3\/4 de la promo');
    this.getAllClient();
  }

  getAllClient(): void {
    this.displayClientService.getAllClient().subscribe(result => this.clientList = result);
  }

  deleteClient(client: Client) {
    this.displayClientService.deleteClient(client).subscribe();
    console.log(client.macAddress + ' devrait être supprimer');
  }
}
