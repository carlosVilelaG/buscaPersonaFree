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
  zoom = 14;
  ///marker
  marker!: mapboxgl.Marker;
  /// coordenas global
  wayPoint: Array<any> = [];
  markerDriver: any = null;
  constructor(private httpClient: HttpClient) {
    this.mapbox.accessToken = environment.mapPk;
  }

  /**buildMap Es el constructor del mapa **/
  buildMap(lng: string, lat: string): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.lng = Number(lng); this.lat = Number(lat);
        this.map = new mapboxgl.Map({
          container: 'map', ///  ide del mapa en el html
          style: this.style,
          zoom: this.zoom,
          center: [ this.lat, this.lng],
        });

        /** Aqui se construye y inicializa el control de zoom del mapa el + -, pero no pinta bien el imagen **/
        //this.map.addControl(new mapboxgl.NavigationControl())
        /** Aqui se construye el imput buscador de direcciones **/
        const geocoder = new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          mapboxgl
        });
        
        //// Aqui escucha el resultado de la busqueda, para capturar las coordenas de la new direccion
        geocoder.on('result', ($event) => {
          const { result } = $event;
          const coordinates = $event.result.geometry.coordinates;
          this.lat = coordinates[0];
          this.lng = coordinates[1];          
          geocoder.clear();
          // Mueve el marcador a las nuevas coordenadas
          this.marker.setLngLat([Number(this.lat), Number(this.lng)]);  
          this.cbAddres.emit(result);
        })

        // Añade un marcador al mapa, habilito para que el marker sea arrastrable
        this.marker =  new mapboxgl.Marker({ draggable: true })
           .setLngLat([Number(this.lat), Number(this.lng)])
           .addTo(this.map);
        
        // Añadir manejador del evento 'dragend' para el marcador
        this.marker.on('dragend', () => {
          const lngLat = this.marker.getLngLat();
          this.cbAddres.emit({ geometry: { coordinates: [lngLat.lng, lngLat.lat] } });
        });

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
