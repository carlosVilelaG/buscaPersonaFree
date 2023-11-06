import { Component } from '@angular/core';
import { Map, marker, tileLayer } from 'leaflet';
import { PerfiltrabajoService } from 'src/app/services/perfiltrabajo.service';
import { UbicacionService } from 'src/app/services/ubicacion.service';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NavegacionService } from 'src/app/services/navegacion.service';

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

  constructor(
    private ubicacionService: UbicacionService,
    private perfiltrabajoService: PerfiltrabajoService,
    private router: Router,
    private navegacionService: NavegacionService
  ) {}

  cargarUbicacionUsuarioLogin(email: string) {
    this.ubicacionService.obtenerUbicacionUsuarioPorEmail(email).subscribe({
      next: (ubicacion) => {
        // Maneja la ubicación obtenida
        this.latUser = ubicacion.latitud;
        this.lonUser = ubicacion.longitud;
        console.log('UBICACION ::: ', ubicacion);
        this.inicializarMapaUsuarioLogin();
      },
      error: (error) => {
        // Maneja el error
        console.log('UBICACION ::: algo paso :( ', error);
      },
    });
  }

  inicializarMapaUsuarioLogin(): void {
    /// coordnadas inciales latitud y longitug :: [-2.27561,-79.87587]
    this.mimapa = new Map('mapUOC').setView([this.latUser, this.lonUser], 16);
    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 30,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.mimapa);
    marker([this.latUser, this.lonUser])
      .addTo(this.mimapa)
      .bindPopup('Usuario: Carlos Vilela');
  }

  // se llama despues de inicalizar las view del componente
  ngAfterViewInit(): void {
    this.cargarUbicacionUsuarioLogin('cvilela1979@gmail.com');
    console.log('valor de larUser::', this.latUser);
    console.log('valor de lonUser::', this.lonUser);
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
            console.log('perfil:::', perfil);
            if (!isNaN(lat) && !isNaN(lon) && this.mimapa) {
              const popupContent = `<div>
               <p>${perfil.nombres} :: Profesión: ${perfil.profesion}</p>
               <button id="contratar${perfil.id}">Contratar</button>
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
                    this.navegacionService.triggerNavigation(perfil.id);
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

  navegarAContrato(id: number) {
    this.router.navigate(['/crear-contrato', id]);
  }
}
