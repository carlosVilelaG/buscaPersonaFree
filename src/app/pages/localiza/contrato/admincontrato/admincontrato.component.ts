import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contrato } from 'src/app/models/contrato';
import { ContratoConNombre } from 'src/app/models/contratoConNombre';
import { ContratoService } from 'src/app/services/contrato.service';
import { SelectorService } from 'src/app/services/selector.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-admincontrato',
  templateUrl: './admincontrato.component.html',
  styleUrls: ['./admincontrato.component.css'],
})
export class AdmincontratoComponent implements OnInit, OnDestroy {
  contratos!: Contrato[];
  contratosConNombres: ContratoConNombre[] = [];
  contrato: Contrato = {
    id_contrato: 0,
    id_usuario_contratante: 0,
    estado: '',
    tipo_contrato: 0,
    id_usuario_trabajador: 0,
    fecha_inicio: '',
    fecha_fin: '',
    descripcion: '',
    comentario: '',
  };
  id_usuario!: number;
  mensaje!: string;
  estadosContrato!: any[];
  tiposContrato!: any[];
  contratoAdminSubscription!: Subscription;
  usuarioAdminSubscripcion!: Subscription;
  editaContratoVisible: boolean = false;

  constructor(
    private contratoService: ContratoService,
    private usuarioServices: UsuarioService,
    private selectores: SelectorService
  ) {}

  ngOnInit(): void {
    this.estadosContrato = this.selectores.getEstadosContrato();
    this.tiposContrato = this.selectores.getTiposContrato();
    this.usuarioAdminSubscripcion = this.contratoAdminSubscription =
      this.usuarioServices.userId$.subscribe((id) => {
        if (this.usuarioServices.usuarioLoginOn) {
          this.id_usuario = id;
        }
      });
    this.contratosConNombres = [];
    this.contratoAdminSubscription = this.contratoService
      .consultaContratoUsuarioRelacionado(this.id_usuario)
      .subscribe((contrato) => {
        if (contrato) {
          this.contratos = contrato;
          // Llena la lista auxiliar contratosConNombres
          this.cargarContratosConNombres();
        }
      });
  }

  editarContrato(id_contrato?: number) {
    const contratoParaEditar = this.contratos.find(
      (c) => c.id_contrato === id_contrato
    );
    if (contratoParaEditar) {
      this.contrato = { ...contratoParaEditar };
      this.contrato.fecha_inicio = new Date(this.contrato.fecha_inicio)
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ');
      this.contrato.fecha_fin = new Date(this.contrato.fecha_fin)
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ');
      this.editaContratoVisible = true;
    }
    this.editaContratoVisible = true;
  }

  guardarEditContrato(): void {
    if (this.contrato) {
      // Formatear la fecha antes de asignarla al contrato
      const fechaFormateada = new Date(this.contrato.fecha_fin);
      this.contrato.fecha_fin = fechaFormateada
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ');
    }
    this.contratoService.editarContrato(this.contrato).subscribe({
      next: (response) => {
        this.mensaje = 'Contrato actualizada con éxito';
        // Encontrar el índice del contrato en la lista por su ID
        const indiceContrato = this.contratos.findIndex(
          (c) => c.id_contrato === this.contrato.id_contrato
        );

        // Reemplazar el contrato en la lista con el contrato actualizado
        if (indiceContrato !== -1) {
          this.contratos[indiceContrato] = this.contrato;
        }
      },
      error: (error) => {
        this.mensaje =
          'Actualización  de contrato presenta inconvenientes: ' + error;
      },
    });
    this.editaContratoVisible = false;
  }

  cargarContratosConNombres(): void {
    this.contratosConNombres = [];
  
    this.contratos.forEach((contrato) => {
      // El nombre del usuario contratante
      this.usuarioServices.consultaNombreUsuario(contrato.id_usuario_contratante).subscribe((nombreContratante) => {
        // El nombre del usuario trabajador
        this.usuarioServices.consultaNombreUsuario(contrato.id_usuario_trabajador).subscribe((nombreTrabajador) => {
          // Creo un objeto ContratoConNombreUsuario con ambos nombres y otros campos
          const contratoConNombres: ContratoConNombre = {
            id_contrato: contrato.id_contrato,
            id_usuario_contratante: contrato.id_usuario_contratante,
            nombre_usuario_contratante: nombreContratante,
            id_usuario_trabajador:  contrato.id_usuario_trabajador,
            nombre_usuario_trabajador: nombreTrabajador
          };
          console.log('Se carga contrato con nombre');
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
  cancelar(): void {
    this.editaContratoVisible = false;
  }
  ngOnDestroy(): void {
    if (this.usuarioAdminSubscripcion) {
      this.usuarioAdminSubscripcion.unsubscribe();
    }

    if (this.contratoAdminSubscription) {
      this.contratoAdminSubscription.unsubscribe();
    }
  }
}
