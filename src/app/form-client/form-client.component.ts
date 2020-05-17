import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {HttpRequestService} from '../services';

@Component({
  selector: 'app-form-client',
  templateUrl: './form-client.component.html',
  styleUrls: ['./form-client.component.css']
})


export class FormClientComponent {

  @Output()
  public refreshEmitter: EventEmitter<void> = new EventEmitter<void>();

  public client = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    macAddress: new FormControl(),
    flightNumber: new FormControl(),
  });

  constructor(private httpRequestService: HttpRequestService) {
  }

  /*
  Ajout d'un nouveau voyageur
   */
  submitForm() {
    this.httpRequestService.addClient(this.client.value).subscribe(() => {
      this.refreshEmitter.emit();
    });
  }
}
