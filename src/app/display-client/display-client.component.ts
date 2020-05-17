import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Client} from '../models/index';
import {BehaviorSubject, Observable, Subject, Subscription, timer} from 'rxjs';
import {HttpRequestService} from '../services';
import {filter, switchMap, takeUntil, takeWhile, tap} from 'rxjs/operators';
import {MatDialog} from "@angular/material/dialog";
import {PingDialogComponent} from "../ping-dialog/ping-dialog.component";

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

  public pingStatus: {[key: string]: Observable<string>} = {};

  public isPingDone: {[key: string]: BehaviorSubject<boolean>} = {};

  constructor(private httpRequestService: HttpRequestService, public dialog: MatDialog) {
  }

  /*
  Réception de tout les clients
   */
  ngOnInit(): void {
    this.clientList$ = this.httpRequestService.getAllClient();
    this.subscriptions.push(
      this.refreshTrigger$.subscribe(() =>
        this.clientList$ = this.httpRequestService.getAllClient()
      )
    );
  }

  openDialog(client: Client): void {
    const dialogRef = this.dialog.open(PingDialogComponent, {
      width: '250px',
      data: {client}
    });

    dialogRef.afterClosed().subscribe(result => {
        this.pingClient(result.client, result.type);
    });
  }

  /*
  Suppression d'un client
   */
  deleteClient(client: Client) {
    this.clientList$ = this.httpRequestService.deleteClient(client);
  }

  /*
  Méthode permettant de lancer un ping et de mettre un jour son statut
   */
  pingClient(client: Client, type: string) {
    this.isPingDone[client._id] = new BehaviorSubject<boolean>(false);
    this.subscriptions.push(
      this.httpRequestService.publishPing(client, type).subscribe((pingId) => {
        this.pingStatus[client._id] = timer(0, 5000).pipe(
          takeUntil(
            this.isPingDone[client._id].pipe(filter((done) => done))
          ),
          switchMap(() => {
            return this.httpRequestService.getPing(pingId).pipe(
              takeWhile((status) => status === 'pending', true),
              tap((status) => {
                if  (status === 'completed' || status === 'failed') {
                  this.isPingDone[client._id].next(true);
                }
              })
            );
          })
        );
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
