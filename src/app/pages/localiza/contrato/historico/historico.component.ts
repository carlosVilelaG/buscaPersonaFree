import { Component, OnDestroy, OnInit } from '@angular/core';
import { Contrato } from 'src/app/models/contrato';
import { ContratoConNombre } from 'src/app/models/contratoConNombre';
import { ContratoService } from 'src/app/services/contrato.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Subscription } from 'rxjs';
import { TipoContrato } from 'src/app/models/tipoContrato';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css']
})
export class HistoricoComponent implements OnInit, OnDestroy {
  contratos!: Contrato[];
  contratosConNombres: ContratoConNombre[] = [];
  id_usuario!: number;
  usuarioContratoSubscripcion!: Subscription;
  contratoConsultaSubscription!: Subscription;
  tiposContrato: TipoContrato[] = [
    { id: 1, nombre: 'Por Día' },
    { id: 2, nombre: 'Por Hora' },
    { id: 3, nombre: 'Más de 5 Días' }
  ];

  constructor(
    private contratoService: ContratoService,
    private usuarioServices: UsuarioService,
  ) {}

  ngOnInit(): void {
        
    this.usuarioContratoSubscripcion =
      this.usuarioServices.userId$.subscribe((id) => {
        if (this.usuarioServices.usuarioLoginOn) {
          this.id_usuario = id;
        }
      });
    this.contratosConNombres = [];
    this.contratoConsultaSubscription = this.contratoService
      .consultaContratoGeneralRelacionado(this.id_usuario)
      .subscribe((contrato) => {
        if (contrato) {
          this.contratos = contrato;          
          this.cargarContratosConNombres();
        }
      });
  }

  cargarContratosConNombres(): void {
    this.contratosConNombres = [];
  
    this.contratos.forEach((contrato) => {
      this.usuarioServices.consultaNombreUsuario(contrato.id_usuario_contratante).subscribe((nombreContratante) => {
        this.usuarioServices.consultaNombreUsuario(contrato.id_usuario_trabajador).subscribe((nombreTrabajador) => {
          const contratoConNombres: ContratoConNombre = {
            id_contrato: contrato.id_contrato,
            id_usuario_contratante: contrato.id_usuario_contratante,
            nombre_usuario_contratante: nombreContratante,
            id_usuario_trabajador:  contrato.id_usuario_trabajador,
            nombre_usuario_trabajador: nombreTrabajador
          };
          this.contratosConNombres.push(contratoConNombres);
        });
      });
    });
  }

  nombreUsuarioContratistaLocal(id_contrato: number): string {
    const contrato = this.contratosConNombres.find(c => c.id_contrato === id_contrato);    
    return contrato?.nombre_usuario_contratante || ' ';
  }
  nombreUsuarioTrabajdor(id_contrato: number): string {
    const contrato = this.contratosConNombres.find(c => c.id_contrato === id_contrato);
    
    return contrato?.nombre_usuario_trabajador || ' ';
  }
  
  nombreTipoContrato(id_tipo : number) : string {
    const contratoEncontrado = this.tiposContrato.find(contrato => contrato.id === id_tipo);
    return contratoEncontrado ? contratoEncontrado.nombre : 'Desconocido';
  }

  ngOnDestroy(): void {
    if (this.usuarioContratoSubscripcion) {
      this.usuarioContratoSubscripcion.unsubscribe();
    }

    if (this.contratoConsultaSubscription) {
      this.contratoConsultaSubscription.unsubscribe();
    }
  }

}
