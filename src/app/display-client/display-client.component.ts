import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Client} from '../models';
import {Observable, Subject, Subscription} from 'rxjs';
import {HttpRequestService} from '../services';

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
  constructor(private displayClientService: HttpRequestService) {}

  ngOnInit(): void {
    this.clientList$ = this.displayClientService.getAllClient();
    this.subscriptions.push(
      this.refreshTrigger$.subscribe(() =>
        this.clientList$ = this.displayClientService.getAllClient()
      )
    );
  }

  deleteClient(client: Client) {
    this.clientList$ = this.displayClientService.deleteClient(client);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
