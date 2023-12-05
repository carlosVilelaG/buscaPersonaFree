import { Component, Renderer2, OnInit, ElementRef, ViewChild } from '@angular/core';

import { Socket } from 'ngx-socket-io';
import { Ubicacion } from 'src/app/models/ubicacion';
import { MapCustomService } from 'src/app/services/map-custom.service';
import { UbicacionService } from 'src/app/services/ubicacion.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-trabajador',
  templateUrl: './trabajador.component.html',
  styleUrls: ['./trabajador.component.css']
})
export class TrabajadorComponent implements OnInit {
  @ViewChild('asGeoCoder') asGeoCoder!: ElementRef;
  modeInput = 'start';
  wayPoints: WayPoints = { start: null, end: null };
  ubicacion !: Ubicacion;
  email !: string;
  mensaje !:string;
  mensajeClass: string = '';

  constructor(private mapCustonService: MapCustomService,
    private renderer2: Renderer2, private socket:Socket,
    private ubicacionService: UbicacionService, private usuarioServicio: UsuarioService){
      this.ubicacion = {
        identificacion_usuario: '',
        telefono: '',
        latitud: '',
        longitud: '',
        estado: '',
        descripcion: ''
      };
    }
 
  ngOnInit(): void {
    this.usuarioServicio.userEmail$.subscribe((email) => {
      if(this.usuarioServicio.usuarioLoginOn){
         this.email = email;
      }
    });
    this.ubicacionService.obtenerUbicacionUsuarioPorEmail(this.email).subscribe({
      next: (ubicacion) => {
        if(ubicacion){
          this.ubicacion = ubicacion;
          console.log('UBICACION 2 :::: ', this.ubicacion);
          this.mapCustonService.buildMap(this.ubicacion.latitud,this.ubicacion.longitud)
          .then(({ geocoder, map }) => {            
            this.renderer2.appendChild(this.asGeoCoder.nativeElement,
              geocoder.onAdd(map)
            );
          })
          .catch((err) => {
            console.log('***** ERROR ****', err);
          });

        }        
      },
      error: (error) => {
        // Maneja el error
        console.log('UBICACION ::: algo paso :( ', error);
      },
    });
    

  this.mapCustonService.cbAddres.subscribe((getPoint) => {
    /**capturamos las coordenadas */
    if (this.modeInput === 'start') {
      this.wayPoints.start = getPoint;
      this.ubicacion.longitud = this.wayPoints.start.geometry.coordinates[0];
      this.ubicacion.latitud = this.wayPoints.start.geometry.coordinates[1];
      console.log('##*** this.ubicacion.longitud 0::',this.ubicacion.longitud);
      console.log('##*** this.ubicacion.latitud 1::',this.ubicacion.latitud);
      //this.ubicacion.latitud = getPoint.geometry.coordinates[0];
      //this.ubicacion.longitud = getPoint.geometry.coordinates[1];
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
  async actualizaUbicacion() :Promise<void> {
    this.mensaje = "";
    this.mensajeClass = '';
    console.log('Enviado ubicacion para guardar o actualizar :: ',this.ubicacion);
    this.ubicacionService.guardaActualizaUbicacion(this.ubicacion).subscribe({
      next: (response) => {
        this.mensaje = 'Guardado con éxito';
        console.log('Se guardó correctamente:', response);
        this.ocultarMensajeSegunTiempo();
      },
      error: (error) => {
        console.error('Error al guardar ubicaciones:', error);
        this.mensaje = 'Presentamos inconvenientes: ' + error;
        this.ocultarMensajeSegunTiempo();
      },
    });
  }

  ocultarMensajeSegunTiempo() {
    setTimeout(() => {
      this.mensaje = '';
      this.mensajeClass = 'fade-out';
    }, 5000); // Oculta después de 5 segundos
    setTimeout(() => {
      this.mensajeClass = 'fade-out';
    }, 3000); // Comienza a desvanecer después de 3 segundos
  }


  
}

export class WayPoints {
  start: any;
  end: any;
}


