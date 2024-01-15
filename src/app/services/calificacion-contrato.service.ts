import { HttpClient , HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { CalificacionContrato } from '../models/calificacionContrato';
import { Observable, catchError, map, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalificacionContratoService {
  
  private API_URL = environment.urlApi;
  constructor(private http: HttpClient) { }

  crearCalificacionContrato(datosCalificacionContrato: CalificacionContrato): Observable<CalificacionContrato> {
    return this.http.post<CalificacionContrato>(
      `${this.API_URL}/calificacion/crear`, datosCalificacionContrato);
  }

  consultaCalificacionesContratante(idContratante: number): Observable<CalificacionContrato[]> {
      return this.http.get<any[]>(`${this.API_URL}/calificacion/${idContratante}`).pipe(
        map(response => response.map(item => ({
          id_calificacion: item.ID_CALIFICACION,
          nivel_calificacion: item.NIVEL_CALIFICACION,
          comentario: item.COMENTARIO,
          id_usuario_trabajador: item.ID_USUARIO_TRABAJADOR,    
          id_contrato: item.ID_CONTRATO})))
          );
  }

  consultaCalificacionesGeneral(): Observable<CalificacionContrato[]> {
    return this.http.get<any[]>(`${this.API_URL}/calificacion/todos`).pipe(
      map(response => response.map(item => ({
        id_calificacion: item.ID_CALIFICACION,
        nivel_calificacion: item.NIVEL_CALIFICACION,
        comentario: item.COMENTARIO,
        id_usuario_trabajador: item.ID_USUARIO_TRABAJADOR,    
        id_contrato: item.ID_CONTRATO})))
        );
  }

  editarCalificacion(datosCalificacionContrato: CalificacionContrato): Observable<any> {
    return this.http.put(`${this.API_URL}/calificacion/editar`, datosCalificacionContrato).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error('Error al actualizar calificacionContrato: ' + error.message));
      })
    );
  }

}
