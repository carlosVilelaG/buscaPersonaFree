import { Component, Renderer2, OnInit, ElementRef, ViewChild } from '@angular/core';

import { Socket } from 'ngx-socket-io';
import { MapCustomService } from 'src/app/services/map-custom.service';

@Component({
  selector: 'app-trabajador',
  templateUrl: './trabajador.component.html',
  styleUrls: ['./trabajador.component.css']
})
export class TrabajadorComponent implements OnInit {
  @ViewChild('asGeoCoder') asGeoCoder!: ElementRef;
  modeInput = 'start';
  wayPoints: WayPoints = { start: null, end: null };

  constructor(private mapCustonService: MapCustomService,
    private renderer2: Renderer2, private socket:Socket){}
 
  ngOnInit(): void {
    this.mapCustonService.buildMap()
    .then(({ geocoder, map }) => {
      this.renderer2.appendChild(this.asGeoCoder.nativeElement,
        geocoder.onAdd(map)
      );
      console.log('**** TODO BIEN ****');
    })
    .catch((err) => {
      console.log('***** ERROR ****' + err);
    });

  this.mapCustonService.cbAddres.subscribe((getPoint) => {
    /**capturamos las coordenadas de incio y final */
    if (this.modeInput === 'start') {
      this.wayPoints.start = getPoint;
    }
    if (this.modeInput === 'end') {
      this.wayPoints.end = getPoint;
    }
  });

  this.socket.fromEvent<{ coords: any }>('position') // Especifica el tipo esperado
  .subscribe(({ coords }) => {
    console.log('************* DESDE SERVER **********', coords);
    this.mapCustonService.addMarkerCustom(coords);
  });

  }
  drawRoute(): void {
    console.log('*******PUNTOS ORIGEN Y DESTINO *****');
    /**cuando te haiga asegurado que se ingresaron
     * las 2 coordenadas punto de origen y destino. */
    const coords = [
      this.wayPoints.start.center, 
      this.wayPoints.end.center
    ];
    this.mapCustonService.loadCoords(coords);
  }
  changeMode(mode: string): void {
    this.modeInput = mode;
  }
  testMarket(): void {
    // se tuvo que cambiar el orden de coordenas para que mapbox ubique correctamente
    this.mapCustonService.addMarkerCustom([-79.87599481091047, -2.275790537200894])
  }

}


export class WayPoints {
  start: any;
  end: any;
}
