import {Component, AfterViewInit, ViewChild, ElementRef, OnInit, OnDestroy} from '@angular/core';
import {Point} from '../models/map-forms';
import LatLng = google.maps.LatLng;
import {Observable, Subscription} from 'rxjs';
import {Client} from '../models/index';
import {HttpRequestService} from '../services/index';

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

  constructor(private httpRequestService: HttpRequestService) {
  }

  /*
  Récupération des clients inscrits
   */
  ngOnInit(): void {
    this.clientList$ = this.httpRequestService.getAllClient();
  }

  /*
    Création de la google map ainsi que des zones
   */
  ngAfterViewInit() {
    this.mapInitializer();
  }

  /*
    Suppresion des subscriptions à des éléments
  */
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  /*
      Initialisation de la map et des zones définis
  */
  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement,
      this.mapOptions);
    this.subscriptions.push(
      this.httpRequestService.getZones().subscribe((zones) => {
        zones.forEach((zone) => {
          const sortedAps = zone.APs.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
          const points = sortedAps.reduce<number[]>((acc, ap) => {
            acc.push(ap.latitude, ap.longitude);
            return acc;
          }, []);
          this.constructPointsForZone(points);
        });
      })
    );
  }

  /*
     Construction de quatres points définis par une latitude et une longitude
 */
  constructPointsForZone(listPosition: number[]) {
    const a = new Point(listPosition[0], listPosition[1]);
    const b = new Point(listPosition[2], listPosition[3]);
    const c = new Point(listPosition[4], listPosition[5]);
    const d = new Point(listPosition[6], listPosition[7]);
    this.constructZone(a, b, c, d);
  }

  /*
     Construction des zones grâce aux quatre points
 */
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

  /*
    Ajout des zones personnalisées à la google map
   */
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

  /*
  Ajout des noms de zones
   */
  attachPolygonLabel(zone) {

    const infoWindow = new google.maps.InfoWindow();
    infoWindow.setContent('Zone ' + this.i);
    const latLng = new LatLng((zone[0].lat + zone[2].lat) / 2, (zone[0].lng + zone[2].lng) / 2);
    infoWindow.setPosition(latLng);
    infoWindow.open(this.map);
  }

  /*
  Méthode permettant d'indiquer quel zone est la dernière à avoir été fréquenter par un visiteur
  @param zoneNumber: numéro de la zone
  @param nom: nom du visiteur ayant été sélectionné
   */
  setActiveForm(zoneNumber, nom: string) {

    if (this.marker) {
      this.marker.setMap(null);
    }
    if (zoneNumber > -1) {
      const activeZone = this.zones[zoneNumber - 1];

      this.marker = new google.maps.Marker({
        position: new LatLng((activeZone[0].lat + activeZone[2].lat) / 2 - 0.00010, (activeZone[0].lng + activeZone[2].lng) / 2),
        map: this.map,
        animation: google.maps.Animation.DROP,
        title: nom
      });
    }
  }

  /*
   Réception de la dernière position du client
   */
  getClientActive(event): void {
    const client: Client = event.value;
    this.subscriptions.push(
      this.httpRequestService.getClientPos(client).subscribe((numberZone) =>
        this.setActiveForm(numberZone, client.firstName + client.lastName)
      ));
  }

}
