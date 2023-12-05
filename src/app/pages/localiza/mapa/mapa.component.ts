import { Component, NgZone } from '@angular/core';
import { Map, marker, tileLayer } from 'leaflet';
import { PerfiltrabajoService } from 'src/app/services/perfiltrabajo.service';
import { UbicacionService } from 'src/app/services/ubicacion.service';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NavegacionService } from 'src/app/services/navegacion.service';
import { AreaProfesion } from 'src/app/models/areaprofesion';
import { AreaProfesionService } from 'src/app/services/area-profesion.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css'],
})
export class MapaComponent {
  latUser: number = 0;
  lonUser: number = 0;
  profesionBuscada: string = '';
  mimapa: Map | null = null;
  marcadores: L.Marker[] = [];
  userId: number = 0;
  profesiones: AreaProfesion[] = [];
  areaProfesionPersona : string = '';
  constructor(
    private ubicacionService: UbicacionService,
    private perfiltrabajoService: PerfiltrabajoService,
    private router: Router,
    private navegacionService: NavegacionService,
    private zone: NgZone,
    private usuarioServicio: UsuarioService,
    private areaProfesionService: AreaProfesionService
  ) {}

  ngOnInit() {
    /// cargo datos para el combo
    this.areaProfesionService.obtenerAreaYProfesion().subscribe({
      next: (data) => {
        this.profesiones = data;
      },
      error: (error) => {
        console.error('Error al obtener profesiones', error);
      },
    });
  }

  cargarUbicacionUsuarioLogin(email: string) {
    console.log('Ejecutado cargarUbicacionUsuarioLogin');
    //if(this.usuarioServicio.usuarioLoginOn){
      this.ubicacionService.obtenerUbicacionUsuarioPorEmail(email).subscribe({
        next: (ubicacion) => {
          // Maneja la ubicación obtenida
          this.latUser = ubicacion.latitud;
          this.lonUser = ubicacion.longitud;
          //console.log('UBICACION ::: ', ubicacion);
          if(ubicacion){
            console.log('UBICACION :::: ', ubicacion);
            this.inicializarMapaUsuarioLogin();
          }        
        },
        error: (error) => {
          // Maneja el error
          console.log('UBICACION ::: algo paso :( ', error);
        },
      });
    //}
    
  }

  inicializarMapaUsuarioLogin(): void {
    /// coordnadas inciales latitud y longitug :: [-2.27561,-79.87587]
    console.log('Entro en incializa mapa,', this.usuarioServicio.usuarioLoginOn);
    if (this.mimapa) {
      console.log('Mapa ya inicializado.');
      return;
    }
    this.mimapa = new Map('mapUOC').setView([this.latUser, this.lonUser], 10);
    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 30,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.mimapa);
    marker([this.latUser, this.lonUser])
      .addTo(this.mimapa)
      .bindPopup( `${this.usuarioServicio.userName$}`);
  }

  // se llama despues de inicalizar las view del componente
  ngAfterViewInit(): void {
    this.usuarioServicio.userEmail$.subscribe((email) => {
      if(this.usuarioServicio.usuarioLoginOn){
         this.cargarUbicacionUsuarioLogin(email);
      }
    });
    this.usuarioServicio.userId$.subscribe((id) => {
      if(this.usuarioServicio.usuarioLoginOn){
      this.userId = id;}
    });
  }

  buscarProfesion() {
    if (!this.profesionBuscada) return;
    // Eliminar marcadores existentes del mapa por busquedas anteriores
    this.marcadores.forEach((marcador) => {
      this.mimapa?.removeLayer(marcador);
    });
    this.marcadores = []; // inicializo el arreglo de marcadores
    this.perfiltrabajoService
      .obtenerPerfilesPorProfesion(this.profesionBuscada)
      .subscribe({
        next: (perfiles) => {
          perfiles.forEach((perfil) => {
            const lat = Number(perfil.latitud);
            const lon = Number(perfil.longitud);
           // let areaProfesionPersona :string = '';
            console.log('perfil:::', perfil);
            if (!isNaN(lat) && !isNaN(lon) && this.mimapa) {             
              const popupContent = `<div>
               <p>${perfil.nombres} :: Profesión: ${perfil.profesion}</p>
               <div class="d-flex justify-content-center"><button class="btn btn-primary me-3" id="contratar${perfil.id}">Contratar</button>
               <button class="btn btn-primary" id="perfil${perfil.id}">Perfil</button> </div>               
               </div>`;
              const marcadoTrabajador = marker([lat, lon])
                .addTo(this.mimapa)
                .bindPopup(popupContent);
              marcadoTrabajador.on('popupopen', () => {
                const contratarButton = document.getElementById(
                  `contratar${perfil.id}`
                );
                if (contratarButton) {
                  contratarButton.addEventListener('click', () => {
                    console.log('Botón contratar clickeado!');
                    this.navegarAContrato(this.userId, perfil.id);
                  });
                }
              });

              this.marcadores.push(marcadoTrabajador);
            }
          });
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  onProfesionChange() {
    this.buscarProfesion();
  }

  navegarAContrato(idcontratante: number, idtrabajador: number) {
    console.log('Se llamo a navegarAContrato:::::cin id ::', idcontratante);
    this.router.navigate(['/crear-contrato', idcontratante, idtrabajador]);
    ///this.router.navigate(['/crear-contrato', id]);
  }
}
