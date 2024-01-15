import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute , Router} from '@angular/router';
import { Subscription, catchError, tap, throwError } from 'rxjs';
import { CalificacionContrato } from 'src/app/models/calificacionContrato';
import { Contrato } from 'src/app/models/contrato';
import { CalificacionContratoService } from 'src/app/services/calificacion-contrato.service';
import { ContratoService } from 'src/app/services/contrato.service';
import { NavegacionService } from 'src/app/services/navegacion.service';
import { SelectorService } from 'src/app/services/selector.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-contrato',
  templateUrl: './contrato.component.html',
  styleUrls: ['./contrato.component.css'],
})
export class ContratoComponent implements OnInit, OnDestroy {
  contrato: Contrato = {
    id_usuario_contratante: 0, 
    id_usuario_trabajador: 0,
    tipo_contrato: 0,
    fecha_inicio: '',
    fecha_fin: '',
    descripcion: '',
    comentario: '',
  };
  
  tipoContrato !: any[];
  private navigationSubscription?: Subscription;
  mensaje !:string;
  mensajeClass: string = '';
  deshabilitaContratar : boolean = false;
  contratoSubscription!: Subscription;

  constructor(
    private navegacionService: NavegacionService,
    private router: ActivatedRoute, private route: Router,
    private contratoService : ContratoService,
    private selectores: SelectorService,
    private calificacionContratoService : CalificacionContratoService,
  ) {

  }

  guardarContrato() {
    this.mensaje = "";
    this.contratoSubscription = this.contratoService.crearContrato(this.contrato).subscribe({
      next: (response) => {
        this.mensaje = 'Contrato creado con exito:';
        this.deshabilitaContratar = true;

        const calificacion : CalificacionContrato = {
          nivel_calificacion : 0,
          comentario: '',
          id_usuario_trabajador: this.contrato.id_usuario_trabajador,    
          id_contrato: response.id_contrato as number,
        }

        this.calificacionContratoService.crearCalificacionContrato(calificacion).subscribe(
          {
            next: (response) => {
              console.log( 'Registro de Calificaion correcta '); 
            },
            error: (error) =>{
              this.mensaje = 'Registro de Calificacion Presenta inconvenientes: ';
            }
          }
        );
      },
      error: (error) =>{
        this.mensaje = 'Registro de Contrato Presenta inconvenientes: ';
      }
    });    

  }


  cancelarRegistro(){
   this.route.navigate(['/inicio']);
  }

  ngOnInit(): void {
    this.mensaje = "";
    this.deshabilitaContratar =false;
    this.tipoContrato = this.selectores.getTiposContrato();
    this.router.params.subscribe(params => {
      this.contrato.id_usuario_contratante = +params['idcontratante'];
      this.contrato.id_usuario_trabajador = +params['idtrabajador'];
      this.contrato.estado = "CONTRATADO";
    });
    this.contratoService.consultaContratoUsuario(this.contrato.id_usuario_trabajador).subscribe({
      next: (contrato) => {
          if (contrato) {
              this.mensaje = 'Error: El usuario tiene contrato vigente';
              this.deshabilitaContratar = true;
          }
      },
      error: (error) => {
          console.log('Entro por error', error);
      }
  });    

  }

  ngOnDestroy(): void {
    if(this.contratoSubscription){
      this.contratoSubscription.unsubscribe();
    }
  }
  
}
