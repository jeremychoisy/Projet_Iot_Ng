import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Client} from '../app.component';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DisplayClientService {

  private baseUrl = 'http:\/\/54.93.113.62:5000';
  private getAllClientUrl = this.baseUrl + '/fleet/get';
  private deleteClientByMac = this.baseUrl + '/fleet/delete';

  constructor(private http: HttpClient) {
  }

  getAllClient(): Observable<Client[]> {
    console.log(this.getAllClientUrl);
    const test = this.http.get<Client[]>(this.getAllClientUrl);
    console.log(test);
    return test;
  }

  deleteClient(client: Client): Observable<Client>{
    const id = client.macAddress;
    const url = '${this.deleteClientByMac}/${id}';
    return this.http.delete<Client>(url).pipe(
      tap(_ => console.log('Client supprimer id = ${id}'))
    );
  }
}
