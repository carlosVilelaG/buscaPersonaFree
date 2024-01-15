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
    id_calificacion: 0,
    nivel_calificacion: 0,
    comentario: '',
    id_usuario_trabajador: 0,
    id_contrato: 0,
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
                console.log('Datos del Response:',response);
                this.listaCalificacionContrato = response;
                console.log('Se llena datos de la lista:', this.listaCalificacionContrato);
                //this.cargarContratosConNombres();
              },
              error: (error) => {
                this.mensaje =
                  'Lista de calificacion de contratistas no exiten: ' + error;
              },
            });
        } else {
          this.calificacionService.consultaCalificacionesGeneral().subscribe({
            next: (response) => {
              console.log('Datos del Response:',response);
              this.listaCalificacionContrato = response;
              //this.cargarContratosConNombres();
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
        .consultaNombreUsuario(contrato.id_usuario_trabajador)
        .subscribe((nombreTrabajador) => {
          // Creo un objeto ContratoConNombreUsuario con ambos nombres y otros campos
          const contratoCalificarConNombres: ContratoConNombre = {
            id_contrato: contrato.id_contrato,
            id_usuario_contratante: 0,
            nombre_usuario_contratante: '',
            id_usuario_trabajador: contrato.id_usuario_trabajador,
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
      (c) => c.id_calificacion === id_calificacion
    );
    if (calificacionParaEditar) {
      this.calificacionContrato = { ...calificacionParaEditar };  
      this.esEditar = true; 

    }
   
  }

  guardarCalificacion() {
    if(this.calificacionContrato){

     const parametros : any = {id_calificacion : this.calificacionContrato.id_calificacion,
                               nivel_calificacion: this.calificacionContrato.nivel_calificacion, 
                               comentario : this.calificacionContrato.comentario }

      this.calificacionService.editarCalificacion(parametros).subscribe({
        next: (response) => {
          this.mensaje = 'Calificacion actualizada con éxito';
          // Encontrar el índice del contrato en la lista por su ID
          const indiceContrato = this.listaCalificacionContrato.findIndex(
            (c) => c.id_contrato === this.calificacionContrato.id_contrato
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
            'Actualización  de contrato presenta inconvenientes: ';
        },
      });
    }    
  }


  inicializaCalificacion() : void {
    this.calificacionContrato = {
      id_calificacion: 0,
      nivel_calificacion: 0,
      comentario: '',
      id_usuario_trabajador: 0,
      id_contrato: 0,
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
