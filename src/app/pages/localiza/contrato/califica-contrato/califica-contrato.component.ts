import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CalificacionContrato } from 'src/app/models/calificacionContrato';
import { ContratoConNombre } from 'src/app/models/contratoConNombre';
import { CalificacionContratoService } from 'src/app/services/calificacion-contrato.service';
import { SelectorService } from 'src/app/services/selector.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-califica-contrato',
  templateUrl: './califica-contrato.component.html',
  styleUrls: ['./califica-contrato.component.css'],
})
export class CalificaContratoComponent implements OnInit, OnDestroy {
  listaCalificacionContrato: CalificacionContrato[] = [];
  contratosCalificadoConNombres: ContratoConNombre[] = [];
  calificacionContrato: CalificacionContrato = {
    ID_CALIFICACION: 0,
    NIVEL_CALIFICACION: 0,
    COMENTARIO: '',
    ID_USUARIO_TRABAJADOR: 0,
    ID_CONTRATO: 0,
  };
  id_usuario!: number;
  mensaje!: string;
  logeado: boolean = false;
  nivelesCalificacion!: any[];
  esEditar : boolean = false;

  constructor(
    private calificacionService: CalificacionContratoService,
    private usuarioServices: UsuarioService,
    private selectores: SelectorService
  ) {}

  ngOnInit(): void {
    this.nivelesCalificacion = this.selectores.getNivelCalificacion();
    this.usuarioServices.userId$.subscribe((id) => {
      if (this.usuarioServices.usuarioLoginOn) {
        this.id_usuario = id;
        if (id > 0) {
          this.logeado = true;          
          this.calificacionService
            .consultaCalificacionesContratante(this.id_usuario)
            .subscribe({
              next: (response) => {
                this.listaCalificacionContrato = response;
                this.cargarContratosConNombres();
              },
              error: (error) => {
                this.mensaje =
                  'Lista de calificacion de contratistas no exiten: ' + error;
              },
            });
        } else {
          this.calificacionService.consultaCalificacionesGeneral().subscribe({
            next: (response) => {
              this.listaCalificacionContrato = response;
              this.cargarContratosConNombres();
            },
            error: (error) => {
              this.mensaje =
                'Lista de calificacion general no exiten: ' + error;
            },
          });
        }
      }
    });
  }

  cargarContratosConNombres(): void {
    this.contratosCalificadoConNombres = [];

    this.listaCalificacionContrato.forEach((contrato) => {
      // El nombre del usuario trabajador
      this.usuarioServices
        .consultaNombreUsuario(contrato.ID_USUARIO_TRABAJADOR)
        .subscribe((nombreTrabajador) => {
          // Creo un objeto ContratoConNombreUsuario con ambos nombres y otros campos
          const contratoCalificarConNombres: ContratoConNombre = {
            id_contrato: contrato.ID_CONTRATO,
            id_usuario_contratante: 0,
            nombre_usuario_contratante: '',
            id_usuario_trabajador: contrato.ID_USUARIO_TRABAJADOR,
            nombre_usuario_trabajador: nombreTrabajador,
          };

          this.contratosCalificadoConNombres.push(contratoCalificarConNombres);
        });
    });
  }

  nombreUsuarioTrabajador(id_contrato: number): string {

    const contrato = this.contratosCalificadoConNombres.find(
      (c) => c.id_contrato === id_contrato
    );
    return contrato?.nombre_usuario_trabajador || ' ';
  }

  editarCalificacion(id_calificacion?: number) {

    const calificacionParaEditar = this.listaCalificacionContrato.find(
      (c) => c.ID_CALIFICACION === id_calificacion
    );
    if (calificacionParaEditar) {
      this.calificacionContrato = { ...calificacionParaEditar };  
      this.esEditar = true; 

    }
   
  }

  guardarCalificacion() {
    if(this.calificacionContrato){

     const parametros : any = {id_calificacion : this.calificacionContrato.ID_CALIFICACION,
                               nivel_calificacion: this.calificacionContrato.NIVEL_CALIFICACION, 
                               comentario : this.calificacionContrato.COMENTARIO }

      this.calificacionService.editarCalificacion(parametros).subscribe({
        next: (response) => {
          this.mensaje = 'Calificacion actualizada con éxito';
          // Encontrar el índice del contrato en la lista por su ID
          const indiceContrato = this.listaCalificacionContrato.findIndex(
            (c) => c.ID_CONTRATO === this.calificacionContrato.ID_CONTRATO
          );
  
          // Reemplazar el contrato en la lista con el contrato actualizado
          if (indiceContrato !== -1) {
            this.listaCalificacionContrato[indiceContrato] = this.calificacionContrato;
          }
          this.inicializaCalificacion();
          this.esEditar = false;
        },
        error: (error) => {
          this.mensaje =
            'Actualización  de contrato presenta inconvenientes: ' + error;
        },
      });
    }    
  }


  inicializaCalificacion() : void {
    this.calificacionContrato = {
      ID_CALIFICACION: 0,
      NIVEL_CALIFICACION: 0,
      COMENTARIO: '',
      ID_USUARIO_TRABAJADOR: 0,
      ID_CONTRATO: 0,
    };
  }
  
  cancelar(): void {
    this.inicializaCalificacion();
    this.esEditar = false;
  }

  getNivelNombre(id: number): string {
    const nivel = this.nivelesCalificacion.find(n => n.id === id);
    return nivel ? nivel.nombre : '0 - No calificado';
  }

  
  ngOnDestroy(): void {}
}
