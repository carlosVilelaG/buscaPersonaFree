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
  ];

  private tiposContrato = [
    { id: 1, nombre: 'Por Dia' },
    { id: 2, nombre: 'Por Hora' },
    { id: 3, nombre: 'Más de 5 Dias' }
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

}
