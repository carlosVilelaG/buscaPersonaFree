import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contrato } from '../models/contrato';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContratoService {

  private API_URL = 'http://localhost:4000/localizador';

  constructor(private http: HttpClient) {}

  crearContrato(datosContrato: Contrato): Observable<Contrato> {
    return this.http.post<Contrato>(`${this.API_URL}/contrato/crear`, datosContrato);
  }
}
