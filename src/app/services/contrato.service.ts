import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contrato } from '../models/contrato';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ContratoService {

  private API_URL = environment.urlApi;

  constructor(private http: HttpClient) {}

  crearContrato(datosContrato: Contrato): Observable<Contrato> {
    return this.http.post<Contrato>(`${this.API_URL}/contrato/crear`, datosContrato);
  }
}
