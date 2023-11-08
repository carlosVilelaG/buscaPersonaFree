import { EventEmitter, Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class MapCustomService {
  //para poder detectar y poder cambiar de
  // un componenete a otro cuando se capture una direccion
  cbAddres: EventEmitter<any> = new EventEmitter<any>();
  mapbox = mapboxgl as typeof mapboxgl;
  map: mapboxgl.Map | null = null;
  /// asigno el stilo de mapa mapbox parametrizada en enviroment
  style = environment.styleMapbox;
  //coordenas iniciales por defoult
  lat = -2.275817;
  lng = -79.875993;
  zoom = 3;
  /// coordenas global
  wayPoint: Array<any> = [];
  markerDriver: any = null;
  constructor(private httpClient: HttpClient) {
    this.mapbox.accessToken = environment.mapPk;
    console.log('constructor ###################### evento: ');
  }

  /**buildMap Es el constructor del mapa **/
  buildMap(lng: string, lat: string): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        console.log('buildMap ###################### evento: ');
        this.lng = Number(lng);
        this.lat = Number(lat);

        this.map = new mapboxgl.Map({
          container: 'map', ///  ide del mapa en el html
          style: this.style,
          zoom: this.zoom,
          center: [this.lng, this.lat],
        });

        /** Aqui se construye y inicializa el control de zoom del mapa el + -, pero no pinta bien el imagen **/
        this.map.addControl(new mapboxgl.NavigationControl());
        /** Aqui se construye el imput buscador de direcciones **/
        const geocoder = new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          mapboxgl,
        });
        //// Aqui escucha el resultado de la busqueda, para capturar las coordenas de la new direccion
        geocoder.on('result', ($event) => {
          const { result } = $event;
          console.log('###################### evento: ' + result);
          geocoder.clear();
          this.cbAddres.emit(result);
        });

        // Añade un marcador al mapa
      new mapboxgl.Marker()
      .setLngLat([this.lng, this.lat])
      .addTo(this.map);


        /**Cuando el key se llama igual que el value o variable de valor
         * solo se pone la variable eje: geocoder
         * en vez de geocoder:geocoder */
        resolve({ map: this.map, geocoder });
      } catch (e) {
        reject(e);
      }
    });
  }

  /// agrega el marcador en la coordenada ejemplo
  addMarkerCustom(coords: any): void {
    console.log('addMarkerCustom ----->', coords);
    const el = document.createElement('div');
    el.className = 'marker';
    /// dibuja el logo del objetivo
    if (!this.markerDriver) {
      this.markerDriver = new mapboxgl.Marker(el);
    } else {
      this.markerDriver.setLngLat(coords).addTo(this.map);
    }
  }
}
