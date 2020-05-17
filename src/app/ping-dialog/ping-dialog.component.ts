import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Client} from '../models';

export interface DialogData {
  client: Client;
}

@Component({
  selector: 'app-ping-dialog',
  templateUrl: './ping-dialog.component.html',
  styleUrls: ['./ping-dialog.component.css']
})
export class PingDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<PingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onCancel(): void {
    this.dialogRef.close();
  }

}
