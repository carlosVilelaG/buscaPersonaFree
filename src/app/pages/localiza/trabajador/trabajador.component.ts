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
    this.mapCustonService.buildMap('-2.27561','-79.87587')
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

  this.socket.fromEvent<{ coords: any }>('position') // Especifico el tipo esperado
  .subscribe(({ coords }) => {
    console.log('************* DESDE SERVER **********', coords);
    this.mapCustonService.addMarkerCustom(coords);
  });

  }

  changeMode(mode: string): void {
    this.modeInput = mode;
  }

}

export class WayPoints {
  start: any;
  end: any;
}
