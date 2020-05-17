import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {
  Client,
  GetFleetResponse, GetPingResponse,
  GetPosResponse,
  GetStatisticsResponse,
  GetZonesResponse,
  Ping,
  Zone
} from '../models/index';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
/*
Class permettant d'effectuer des requêtes http vers notre back
*/
export class HttpRequestService {
  private readonly baseUrl = 'http://54.93.113.62:5000';
  private readonly addClientUrl = this.baseUrl + '/fleet/add';
  private readonly getAllClientUrl = this.baseUrl + '/fleet/get';
  private readonly deleteClientUrl = this.baseUrl + '/fleet/delete';
  private readonly getLastPosUrl = this.baseUrl + '/position/get-last-by-client-id';
  private readonly getZonesUrl = this.baseUrl + '/config/get-zones';
  private readonly getPingStatusUrl = this.baseUrl + '/ping/get';
  private readonly publishUrl = this.baseUrl + '/ping/publish';
  private readonly getStatisticsUrl = this.baseUrl + '/statistics/get';

  constructor(private http: HttpClient) {
  }

  /*
  Call permettant d'ajouter un nouveau voyageur
   */
  addClient(client: Client): Observable<Client[]> {
    return this.http.post<GetFleetResponse>(this.addClientUrl, client).pipe(
      map((res) => res.fleet)
    );
  }

  /*
  Call permettant de recevoir tout les voyageurs inscrits
   */
  getAllClient(): Observable<Client[]> {
    return this.http.get<GetFleetResponse>(this.getAllClientUrl).pipe(
      map((res) => res.fleet)
    );
  }

  /*
  Call permettant de supprimer un voyageur
   */
  deleteClient(client: Client): Observable<Client[]> {
    return this.http.post<GetFleetResponse>(this.deleteClientUrl, {macAddress: client.macAddress}).pipe(
      map((res) => res.fleet)
    );
  }

  /*
    Call permettant de recevoir la dernière position enregistrer par son module
   */
  getClientPos(client: Client): Observable<number> {
    return this.http.get<GetPosResponse>(this.getLastPosUrl + '?id=' + client._id).pipe(
      map((res) => {
        return res.position.zone;
      }),
      catchError((err: HttpErrorResponse) => {
        if (err.status === 404) {
          return of(-1);
        }
      }),
    );
  }

  /*
    Call permettant de récupérer les informations sur les différentes zones.
  */
  getZones(): Observable<Zone[]> {
    return this.http.get<GetZonesResponse>(this.getZonesUrl).pipe(
      map((res) => res.zones)
    );
  }

  /*
      Call permettant de lancer un avertissement à un module
   */
  publishPing(client: Client, type: string): Observable<string> {
    return this.http.post<GetPingResponse>(this.publishUrl, {id: client._id, type}).pipe(
      map((res) => {
        return res.ping._id;
      })
    );
  }

  /*
     Call permettant de savoir si le module à bien reçu ou non l'avertissement
  */
  getPing(pingId: string): Observable<string> {
    return this.http.get<GetPingResponse>(this.getPingStatusUrl + '?id=' + pingId).pipe(
      map((res) => {
        return res.ping.status;
      })
    );
  }

  /*
    Call permettant de récupérer les statistique liés au passage d'un client dans une zone spécifique
   */
  getStatistics(): Observable<GetStatisticsResponse> {
    return this.http.get<GetStatisticsResponse>(this.getStatisticsUrl);
  }
}
