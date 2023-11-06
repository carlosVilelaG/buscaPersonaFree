import { EventEmitter, Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class MapCustomService {
  //para poder detectar y poder cambiar de
  // un componenete a otro cuando se capture una direccion
  cbAddres:EventEmitter<any> = new EventEmitter<any>();
  mapbox = (mapboxgl as typeof mapboxgl);
  map : mapboxgl.Map | null = null;
  style = 'mapbox://styles/mapbox/streets-v12';
  lat = -2.275817;
  lng = -79.875993;
  zoom = 3;
  /// coordenas global
  wayPoint: Array<any> = [];
  markerDriver: any = null;
  constructor(private httpClient: HttpClient, private socket :Socket) { 
    this.mapbox.accessToken = environment.mapPk;
  }

 /**Aqui construimos el mapa **/  
 buildMap(): Promise<any> {
  return new Promise((resolve, reject) => {
    try {
      this.map = new mapboxgl.Map({
        container: 'map',
        style: this.style,
        zoom : this.zoom,
        center : [this.lng, this.lat]
       });

       /** Aqui construimos el control de zoom del mapa el + -, pero no pinta bien el imagen **/  
       this.map.addControl(new mapboxgl.NavigationControl());
       /** Aqui se construye el imput bscador de direcciones **/
       const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl
       })

       geocoder.on('result',($event) =>{
        const  {result} = $event;
        geocoder.clear();
        console.log("###################### evento: "+ result)
        this.cbAddres.emit(result);
       });

       /**Cuando el key se llama igual que el value o variable de valor
        * solo se pone la variable eje: geocoder
        * en vez de geocoder:geocoder */
       resolve({ map : this.map, 
        geocoder});
    } catch(e) {
      reject(e)
    }                 
  });
}

loadCoords(coords: number[][]): void {
  console.log('-------------------->', coords);
  const url = [
  `https://api.mapbox.com/directions/v5/mapbox/driving/`,
  `${coords[0][0]},${coords[0][1]};${coords[1][0]},${coords[1][1]}`,
  `?steps=true&geometries=geojson&access_token=${environment.mapPk}`,
  
 ].join('');
 
 this.httpClient.get(url).subscribe((res:any) => {
    
    const data = res.routes[0];
    const route = data.geometry.coordinates;
    console.log('--------->',route);

    this.map?.addSource( 'route', {
      type:'geojson',
      data:{
        type : 'Feature',
        properties:{},
        geometry:{
          type: 'LineString',
          coordinates: route
        }
      }
     });
     // capa de la ruta
     this.map?.addLayer({
      id : 'route',
      type: 'line',
      source: 'route',
      layout: {
        'line-join':'round',
        'line-cap': 'round'
      },
      paint:{
        'line-color': 'red',
        'line-width': 5
      }
     });
     this.wayPoint = route;
     /// ajustarme al zoom para que abarque todo en pantalla
     /// que se adapte a la 1era coordenada y a la ultima
     this.map?.fitBounds([route[0], route[route.length -1]],{
      padding: 100
     })

     /// que emita un evento para buscar un conductor o buscar a alguien y despues lo dedvolvemos
     this.socket.emit('faind-driver', {points :route});
  });

 console.log('######*******#######', url);
}

/// agrega el marcador en la coordenada ejemplo
addMarkerCustom(coords : any): void {
  console.log('----->', coords)
  const el = document.createElement('div');
  el.className = 'marker';
  /// dibuja el logo del objetivo
  if(!this.markerDriver){
    this.markerDriver = new mapboxgl.Marker(el);
  }else{
    this.markerDriver.setLngLat(coords)
    .addTo(this.map);  
  }
  
      
}

}
