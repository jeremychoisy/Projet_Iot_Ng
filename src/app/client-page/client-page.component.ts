import {Component} from '@angular/core';
import {Subject} from 'rxjs';


@Component({
  selector: 'app-client-page',
  templateUrl: './client-page.component.html',
  styleUrls: ['./client-page.component.css']
})
export class ClientPageComponent {
  public refreshTrigger$: Subject<void> = new Subject<void>();
}
