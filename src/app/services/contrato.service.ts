import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Contrato } from '../models/contrato';
import { Observable, catchError, of, throwError } from 'rxjs';
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

  consultaContratoUsuario(idUsuarioTrabajador: number): Observable<Contrato | null> {
    return this.http.get<Contrato>(`${this.API_URL}/contrato/usuario/${idUsuarioTrabajador}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {          
          return of(null); 
        }
        return throwError(() => new Error('Error al consultar contrato: ' + error.message));
      })
    );
  }

  consultaContratoUsuarioRelacionado(id_usuario: number): Observable<Contrato[]> {
    return this.http.get<Contrato[]>(`${this.API_URL}/contrato/relacionado/${id_usuario}`);        
  }
  
  consultaContratoGeneralRelacionado(id_usuario: number): Observable<Contrato[]> {
    return this.http.get<Contrato[]>(`${this.API_URL}/contrato/general/${id_usuario}`);
  }

  editarContrato(datosContrato: Contrato): Observable<any> {
    return this.http.put(`${this.API_URL}/contrato/editar`, datosContrato).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error('Error al actualizar contrato: ' + error.message));
      })
    );
  }

}
