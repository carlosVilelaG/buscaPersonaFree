import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute , Router} from '@angular/router';
import { Subscription, catchError, tap, throwError } from 'rxjs';
import { Contrato } from 'src/app/models/contrato';
import { ContratoService } from 'src/app/services/contrato.service';
import { NavegacionService } from 'src/app/services/navegacion.service';

@Component({
  selector: 'app-contrato',
  templateUrl: './contrato.component.html',
  styleUrls: ['./contrato.component.css'],
})
export class ContratoComponent implements OnInit, OnDestroy {
  contrato: Contrato = {
    id_usuario_contratante: 0, // Inicializar con el valor recibido
    id_usuario_trabajador: 0,  // Inicializar con el valor recibido
    tipo_contrato: 0,
    fecha_inicio: '',
    fecha_fin: '',
    descripcion: ''
  };
  
  private navigationSubscription?: Subscription;

  constructor(
    private navegacionService: NavegacionService,
    private router: ActivatedRoute, private route: Router,
    private contratoService : ContratoService
  ) {
    console.log('Se llama a componente:: es constructor');
  }

  guardarContrato() {
    this.contratoService.crearContrato(this.contrato).pipe(
      tap((respuesta) => console.log('Contrato guardado', respuesta)),
      catchError((error) => {
        console.error('Error al guardar contrato', error);
        // throwError recibe una función que devuelve el error
        return throwError(() => error);
      })
    ).subscribe();
  }

  cancelarRegistro(){
   this.route.navigate(['/inicio']);
  }

  ngOnInit(): void {
    console.log('::Se llama a ngOnInit::');
    this.router.params.subscribe(params => {
      this.contrato.id_usuario_contratante = +params['idcontratante']; // El signo '+' convierte el valor en número
      this.contrato.id_usuario_trabajador = +params['idtrabajador'];
      this.contrato.estado = "CONTRATADO";
    });
/*
    this.navigationSubscription =
      this.navegacionService.navigateToContrato.subscribe(({idcontratante, idtrabajador}) => {
        console.log('Se llama a ngOnInit con parametro id::',idtrabajador);
        this.route.navigate(['/crear-contrato', idcontratante,idtrabajador]);
      });*/
  }

  ngOnDestroy(): void {
    console.log('::Se llama a ngOnDestroy::');
    if (this.navigationSubscription) {
      console.log('Se llama a ngOnDestroy');
      this.navigationSubscription.unsubscribe();
    }
  }
  
}
