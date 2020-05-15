import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

interface Client {
  firstName: string;
  lastName: string;
  macAddress: string;
  flightNumber: string;
}

@Component({
  selector: 'app-form-client',
  templateUrl: './form-client.component.html',
  styleUrls: ['./form-client.component.css']
})


export class FormClientComponent implements OnInit {

  client = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    macAddress: new FormControl(),
    flightNumber: new FormControl(),
  });

  listClient: Client[] = [];

  submitForm(){
    this.listClient.push(this.client.value);
    this.readList();
  }

  private readList() {

    for (let i = 0; this.listClient.length; i++) {
      console.log(' client numéro ' + i + this.listClient[i]);
    }
  }

  ngOnInit(): void {
  }

}

