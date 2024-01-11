import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { ClasificacionContrato } from '../models/calificacionContrato';
import { Observable, catchError, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalificacionContratoService {
  
  private API_URL = environment.urlApi;
  constructor(private http: HttpClient) { }

  crearCalificacionContrato(datosCalificacionContrato: ClasificacionContrato): Observable<ClasificacionContrato> {
    return this.http.post<ClasificacionContrato>(`${this.API_URL}/calificacion/crear`, datosCalificacionContrato);
  }

  concultaCalificacionesContratante(id_usuario_contratante: ClasificacionContrato): Observable<ClasificacionContrato[]> {
    return this.http.get<ClasificacionContrato[]>(`${this.API_URL}/calificacion/${id_usuario_contratante}`);
  }

  concultaCalificacionesGeneral(): Observable<ClasificacionContrato[]> {
    return this.http.get<ClasificacionContrato[]>(`${this.API_URL}/calificacion/todos`);
  }

}
