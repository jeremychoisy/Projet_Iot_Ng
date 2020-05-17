import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Client} from '../models/index';
import {Observable, Subject, Subscription} from 'rxjs';
import {HttpRequestService} from '../services';
import {delay} from 'rxjs/operators';

@Component({
  selector: 'app-display-client',
  templateUrl: './display-client.component.html',
  styleUrls: ['./display-client.component.css']
})

export class DisplayClientComponent implements OnInit, OnDestroy {
  @Input()
  public refreshTrigger$: Subject<void>;

  public clientList$: Observable<Client[]>;

  private subscriptions: Subscription[] = [];

  constructor(private displayClientService: HttpRequestService) {
  }

  /*
  Réception de tout les clients
   */
  ngOnInit(): void {
    this.clientList$ = this.displayClientService.getAllClient();
    this.subscriptions.push(
      this.refreshTrigger$.subscribe(() =>
        this.clientList$ = this.displayClientService.getAllClient()
      )
    );
  }

  /*
  Suppression d'un client
   */
  deleteClient(client: Client) {
    this.clientList$ = this.displayClientService.deleteClient(client);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  /*
  Méthode permettant de lancer un ping et de mettre un jour son statut
   */
  async pingClient(client: Client) {
    console.log(client._id);
    client.pingStatus = 'loading';
    await delay(5000);
    client.pingStatus = 'check';
    /*await delay(5000);
    client.pingStatus = 'cross';*/
  }
}
