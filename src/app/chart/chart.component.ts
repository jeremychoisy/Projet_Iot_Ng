import {Component, OnInit} from '@angular/core';
import {HttpRequestService} from '../services';
import {Observable} from 'rxjs';
import {ChartData} from '../models/index';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  public chartData$: Observable<ChartData>;

  constructor(private httpRequestService: HttpRequestService) {}

  ngOnInit(){
    this.chartData$ = this.httpRequestService.getStatistics().pipe(
      map((response) => {
        return {
          barChartOptions:  {
            responsive: true
          },
          barChartLabels: Object.keys(response.statistics).map((key) => 'Zone ' + key),
          barChartType: 'bar',
          barChartLegend: true,
          barChartPlugins: [],
          barChartData: [
            {data: Object.values(response.statistics), label: 'Nombre de passages'}
          ]
        };
      })
    );
  }
}
