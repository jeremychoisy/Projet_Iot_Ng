import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Client, GetFleetResponse} from '../models/index';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {
  private readonly baseUrl = 'http://54.93.113.62:5000';
  private readonly addClientUrl = this.baseUrl + '/fleet/add';
  private readonly getAllClientUrl = this.baseUrl + '/fleet/get';
  private readonly deleteClientByMac = this.baseUrl + '/fleet/delete';

  constructor(private http: HttpClient) {}

  addClient(client: Client): Observable<Client[]>{
    return this.http.post<GetFleetResponse>(this.addClientUrl, client).pipe(
      map((res) => res.fleet)
    );
  }

  getAllClient(): Observable<Client[]> {
    return this.http.get<GetFleetResponse>(this.getAllClientUrl).pipe(
      map((res) => res.fleet)
    );
  }

  deleteClient(client: Client): Observable<Client[]>{
    return this.http.post<GetFleetResponse>(this.deleteClientByMac, {macAddress: client.macAddress}).pipe(
      map((res) => res.fleet)
    );
  }
}
