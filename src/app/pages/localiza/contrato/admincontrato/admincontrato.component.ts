import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contrato } from 'src/app/models/contrato';
import { ContratoService } from 'src/app/services/contrato.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-admincontrato',
  templateUrl: './admincontrato.component.html',
  styleUrls: ['./admincontrato.component.css'],
})
export class AdmincontratoComponent implements OnInit, OnDestroy {
  contratos!: Contrato[];
  id_usuario!: number;
  contratoAdminSubscription!: Subscription;
  usuarioAdminSubscripcion!: Subscription;

  contratoSeleccionado: Contrato = {
    id_contrato: 0,
    id_usuario_contratante: 0,
    estado: '',
    tipo_contrato: 0,
    id_usuario_trabajador: 0,
    fecha_inicio: '',
    fecha_fin: '',
    descripcion: '',
  };
  constructor(
    private contratoService: ContratoService,
    private usuarioServices: UsuarioService
  ) {}

  ngOnInit(): void {
    this.usuarioAdminSubscripcion = this.contratoAdminSubscription =
      this.usuarioServices.userId$.subscribe((id) => {
        if (this.usuarioServices.usuarioLoginOn) {
          this.id_usuario = id;
        }
      });

    this.contratoAdminSubscription = this.contratoService
      .consultaContratoUsuarioRelacionado(this.id_usuario)
      .subscribe((contrato) => {
        if (contrato) {
          this.contratos = contrato;
        }
      });
  }

  editarContrato(id_contrato?: number) {
    console.log('Editara Contrato, estado y descripcion', id_contrato);
  }

  ngOnDestroy(): void {
    if( this.usuarioAdminSubscripcion){
      this.usuarioAdminSubscripcion.unsubscribe();
    }
    
    if( this.contratoAdminSubscription){
      this.contratoAdminSubscription.unsubscribe();
    }
  }
}
