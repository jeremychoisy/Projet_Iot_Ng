import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Client} from '../app.component';

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
  }

  ngOnInit(): void {
  }

}

