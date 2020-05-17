import {Component, AfterViewInit, ViewChild, ElementRef, OnInit, OnDestroy} from '@angular/core';
import {Point} from '../models/map-forms';
import LatLng = google.maps.LatLng;
import {Observable, Subject, Subscription} from 'rxjs';
import {Client} from '../models';
import {HttpRequestService} from '../services';

@Component({
  selector: 'app-airport-map',
  templateUrl: './airport-map.component.html',
  styleUrls: ['./airport-map.component.css']
})
export class AirportMapComponent implements AfterViewInit, OnInit, OnDestroy {

  @ViewChild('mapContainer', {static: false}) gmap: ElementRef;
  map: google.maps.Map;

  coordinates = new google.maps.LatLng(43.6650847, 7.2130578);
  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 19,
    draggable: false
  };
  i = 0;
  colors = ['#FDCFC6', '#CCFDC6', '#FDEBC6', '#EAFDC6', '#F7C6FD', '#C6FDE4', '#C6F6FD', '#C6E5FD', '#CAC6FD', '#FDF9C6', '#FDC6E7', '#D8D4D6', '#C68CFF', '#FFC48C'];
  zones = [];
  marker;
  private subscriptions: Subscription[] = [];


  public clientList$: Observable<Client[]>;

  constructor(private displayClientService: HttpRequestService) {
  }

  ngOnInit(): void {
    this.clientList$ = this.displayClientService.getAllClient();
  }

  ngAfterViewInit() {
    this.mapInitializer();
    this.setActiveForm(3, 'Jhon Cena');
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement,
      this.mapOptions);
    // ZONE 1
    this.constructPointsForZone([
      43.665289, 7.211399,
      43.664977, 7.211461,
      43.665097, 7.212199,
      43.665413, 7.212083
    ]);
    // ZONE 2
    this.constructPointsForZone([
      43.664977, 7.211461,
      43.664674, 7.211542,
      43.664767, 7.212309,
      43.665097, 7.212199
    ]);
    // ZONE 3
    this.constructPointsForZone([
      43.665413, 7.212083,
      43.665097, 7.212199,
      43.665193, 7.212757,
      43.665433, 7.212714
    ]);
    // ZONE 4
    this.constructPointsForZone([
      43.665097, 7.212199,
      43.664767, 7.212309,
      43.664823, 7.212869,
      43.665193, 7.212757
    ]);
    // ZONE 5
    this.constructPointsForZone([
      43.665433, 7.212714,
      43.665011, 7.212818,
      43.665083, 7.213336,
      43.665525, 7.213180
    ]);
    // ZONE 6
    this.constructPointsForZone([
      43.665011, 7.212818,
      43.664753, 7.212892,
      43.664828, 7.213415,
      43.665083, 7.213336
    ]);
    // ZONE 7
    this.constructPointsForZone([
      43.665525, 7.213180,
      43.665083, 7.213336,
      43.665177, 7.213820,
      43.665602, 7.213624
    ]);
    // ZONE 8
    this.constructPointsForZone([
      43.665083, 7.213336,
      43.664828, 7.213415,
      43.664905, 7.213876,
      43.665177, 7.213820
    ]);
    // ZONE 9
    this.constructPointsForZone([
      43.665602, 7.213624,
      43.665177, 7.213820,
      43.665558, 7.214584,
      43.665766, 7.214278
    ]);
    // ZONE 10
    this.constructPointsForZone([
      43.665177, 7.213820,
      43.664905, 7.213876,
      43.665409, 7.214890,
      43.665558, 7.214584
    ]);
    // ZONE 11
    this.constructPointsForZone([
      43.664650, 7.212058,
      43.664453, 7.212074,
      43.664542, 7.212965,
      43.664753, 7.212892
    ]);
    // ZONE 12
    this.constructPointsForZone([
      43.664753, 7.212892,
      43.664542, 7.212965,
      43.664608, 7.213440,
      43.664828, 7.213415
    ]);
    // ZONE 13
    this.constructPointsForZone([
      43.664828, 7.213415,
      43.664608, 7.213440,
      43.664662, 7.213936,
      43.664905, 7.213876
    ]);
    // ZONE 14
    this.constructPointsForZone([
      43.664905, 7.213876,
      43.664662, 7.213936,
      43.664725, 7.214536,
      43.664972, 7.214432
    ]);
  }

  constructPointsForZone(listPosition: number[]) {
    const a = new Point(listPosition[0], listPosition[1]);
    const b = new Point(listPosition[2], listPosition[3]);
    const c = new Point(listPosition[4], listPosition[5]);
    const d = new Point(listPosition[6], listPosition[7]);
    this.constructZone(a, b, c, d);
  }

  constructZone(a: Point, b: Point, c: Point, d: Point) {
    const zone = [
      {lat: a.lat, lng: a.lng},
      {lat: b.lat, lng: b.lng},
      {lat: c.lat, lng: c.lng},
      {lat: d.lat, lng: d.lng},
    ];
    this.zones.push(zone);
    this.addZoneToMap(zone);
  }

  addZoneToMap(zone) {
    const zoneForm = new google.maps.Polygon({
      paths: zone,
      strokeColor: this.colors[this.i],
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: this.colors[this.i],
      fillOpacity: 0.35
    });
    this.i++;
    this.attachPolygonLabel(zone);
    zoneForm.setMap(this.map);
  }

  attachPolygonLabel(zone) {

    const infoWindow = new google.maps.InfoWindow();
    infoWindow.setContent('Zone ' + this.i);
    const latLng = new LatLng((zone[0].lat + zone[2].lat) / 2, (zone[0].lng + zone[2].lng) / 2);
    infoWindow.setPosition(latLng);
    infoWindow.open(this.map);
  }

  setActiveForm(zoneNumber, nom: string) {

    const activeZone = this.zones[zoneNumber];

    if (this.marker) {
      this.marker.setMap(null);
    }

    this.marker = new google.maps.Marker({
      position: new LatLng((activeZone[0].lat + activeZone[2].lat) / 2 - 0.00010, (activeZone[0].lng + activeZone[2].lng) / 2),
      map: this.map,
      animation: google.maps.Animation.DROP,
      title: nom
    });
  }

  getClientActive(event): void {
    const client: Client = event.value;
    this.subscriptions.push(
      this.displayClientService.getClientPos(client).subscribe((numberZone) =>
        this.setActiveForm(numberZone, client.firstName + client.lastName))
    );
  }

}
