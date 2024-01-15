import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectorService {
  private tiposIdentificacion = [
    { id: 'CEDULA', nombre: 'Cédula' },
    { id: 'PASAPORTE', nombre: 'Pasaporte' },
    { id: 'OTRO', nombre: 'Otro' }
  ];

  private tiposRol = [
    { id: '1', nombre: 'Contratista' },
    { id: '2', nombre: 'Trabajador' }
  ];

  private areaprofesione = [
    { id: 1, nombre: 'TECNOLOGIA' },
    { id: 2, nombre: 'ABOGACIA' },
    { id: 3, nombre: 'ELECTRONICO' },
    { id: 4, nombre: 'CONSTRUCCION' },
    { id: 5, nombre: 'DISEÑO DIGITAL' },
    { id: 6, nombre: 'ALBAÑIL' },
    { id: 7, nombre: 'PLOMERO' },
    { id: 8, nombre: 'CLASES MATEMATICAS' },
    { id: 9, nombre: 'ELECTRICO' },
    { id: 10, nombre: 'CONTRATISTA' },
    { id: 11, nombre: 'REDES DE COMNICACION' },
    { id: 12, nombre: 'BASE DE DATOS' },
  ];

  private tiposContrato = [
    { id: 1, nombre: 'Por Dia' },
    { id: 2, nombre: 'Por Hora' },
    { id: 3, nombre: 'Más de 5 Dias' }
  ];

  private estadosContrato = [
    { id: 'CONTRATADO', nombre: 'CONTRATADO' },
    { id: 'TERMINADO', nombre: 'TERMINADO' },
    { id: 'CANCELADO', nombre: 'CANCELADO' }
  ];

  private nivelCalificacion = [
    { id: 1, nombre: '1- NO RECOMIEDO' },
    { id: 2, nombre: '2- MALO' },
    { id: 3, nombre: '3- MALO' },
    { id: 4, nombre: '4- NO SE' },
    { id: 5, nombre: '5- BUENO' },
    { id: 6, nombre: '6- BUENO' },
    { id: 7, nombre: '7- MUY BUENO' },
    { id: 8, nombre: '8- MUY BUENO' },
    { id: 9, nombre: '9- EXCELENTE' },
    { id: 10, nombre: '10-EXCELENTE' },
  ];
  constructor() { }

  getTiposIdentificacion() {
    return this.tiposIdentificacion;
  }

  getTiposRol() {
    return this.tiposRol;
  }

  getAreProfesiones(){
    return this.areaprofesione;
  }

  getTiposContrato(){
    return this.tiposContrato;
  }

  getEstadosContrato(){
    return this.estadosContrato;
  }

  getNivelCalificacion(){
    return this.nivelCalificacion;
  }
}
