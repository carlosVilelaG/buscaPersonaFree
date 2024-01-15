import { Component, NgZone } from '@angular/core';
import { Map, marker, tileLayer } from 'leaflet';
import { PerfiltrabajoService } from 'src/app/services/perfiltrabajo.service';
import { UbicacionService } from 'src/app/services/ubicacion.service';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NavegacionService } from 'src/app/services/navegacion.service';
import { AreaProfesion } from 'src/app/models/areaprofesion';
import { AreaProfesionService } from 'src/app/services/area-profesion.service';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { Perfiltrabajador } from 'src/app/models/perfiltrabajador';

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
  areaProfesionPersona: string = '';
  noTieneUbicacion: boolean = false;
  mensaje :string = '';
  private mapaSubscription!: Subscription;
  private ubicacionSubscription!: Subscription;
  private perfiltrabajoSubscription!: Subscription;
  private areaProfesionSubscrition!: Subscription;

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
    this.areaProfesionSubscrition = this.areaProfesionService
      .obtenerAreaYProfesion()
      .subscribe({
        next: (data) => {
          this.profesiones = data;
        },
        error: (error) => {
          console.error('Error al obtener profesiones', error);
        },
      });
  }

  cargarUbicacionUsuarioLogin(email: string) {
    this.ubicacionSubscription = this.ubicacionService
      .obtenerUbicacionUsuarioPorEmail(email)
      .subscribe({
        next: (ubicacion) => {
          if (ubicacion) {
            this.latUser = ubicacion.latitud;
            this.lonUser = ubicacion.longitud;

            this.inicializarMapaUsuarioLogin();
          } else {
            this.noTieneUbicacion = true;
          }
        },
        error: (error) => {
          console.log('UBICACION ::: algo paso :( ', error);
        },
      });
  }

  inicializarMapaUsuarioLogin(): void {
    if (this.mimapa) {
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
      .bindPopup(`${this.usuarioServicio.userName$}`);
  }

  // se llama despues de inicalizar las view del componente
  ngAfterViewInit(): void {
    this.mapaSubscription = this.usuarioServicio.userEmail$.subscribe(
      (email) => {
        if (this.usuarioServicio.usuarioLoginOn) {
          this.cargarUbicacionUsuarioLogin(email);
        }
      }
    );
    this.usuarioServicio.userId$.subscribe((id) => {
      if (this.usuarioServicio.usuarioLoginOn) {
        this.userId = id;
      }
    });
  }

  buscarProfesion() {
    this.mensaje = '';
    if (!this.profesionBuscada) return;
    // Eliminoo marcadores existentes del mapa por busquedas anteriores
    this.marcadores.forEach((marcador) => {
      this.mimapa?.removeLayer(marcador);
    });
    this.marcadores = []; // inicializo el arreglo de marcadores
    this.perfiltrabajoSubscription = this.perfiltrabajoService
      .obtenerPerfilesPorProfesion(this.profesionBuscada)
      .subscribe({
        next: (perfiles) => {
          if(perfiles.length === 0){
            this.mensaje = "No se encontraron personas disponibles para esa area";
            console.log('No se encontraron personas disponibles para esa area')
          } else {
            perfiles.forEach((perfil) => {
            const lat = Number(perfil.latitud);
            const lon = Number(perfil.longitud);

            if (!isNaN(lat) && !isNaN(lon) && this.mimapa) {
              const popupContent = `<div>
               <p>${perfil.nombres} :: Profesión: ${perfil.introduccion}</p>
               <div class="d-flex justify-content-center"><button class="btn btn-primary me-3" id="contratar${perfil.id}">Contratar</button>
               <button class="btn btn-primary" id="perfil${perfil.id}">Perfil</button> </div>               
               </div>`;
              const marcadoTrabajador = marker([lat, lon])
                .addTo(this.mimapa)
                .bindPopup(popupContent);

              marcadoTrabajador.on('popupopen', () => {
                // Manejador para el botón de Contratar
                const contratarButton = document.getElementById(
                  `contratar${perfil.id}`
                );
                if (contratarButton) {
                  contratarButton.addEventListener('click', () => {
                    this.navegarAContrato(this.userId, perfil.id);
                  });
                }
                // Manejador para el botón de ver perfil
                const perfilButton = document.getElementById(`perfil${perfil.id}`);
                if (perfilButton) {
                  perfilButton.addEventListener('click', () => {
                    this.navegarAVerPerfilTrabajador(perfil.id);
                  });
                }

              });

              this.marcadores.push(marcadoTrabajador);
            }
          });
        }
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
    this.router.navigate(['/crear-contrato', idcontratante, idtrabajador]);
  }

  navegarAVerPerfilTrabajador(perfilTrabajador : number) {
    this.router.navigate(['/ver-perfil',perfilTrabajador]);
  }

  ngOnDestroy() {
    console.log('destroy de mapa subscribe');
    if (this.ubicacionSubscription) {
      this.ubicacionSubscription.unsubscribe();
    }
    if (this.mapaSubscription) {
      this.mapaSubscription.unsubscribe();
    }
    if (this.perfiltrabajoSubscription) {
      this.perfiltrabajoSubscription.unsubscribe();
    }
    if (this.areaProfesionSubscrition) {
      this.areaProfesionSubscrition.unsubscribe();
    }
  }
}
