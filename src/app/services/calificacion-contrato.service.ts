import { HttpClient , HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { CalificacionContrato } from '../models/calificacionContrato';
import { Observable, catchError, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalificacionContratoService {
  
  private API_URL = environment.urlApi;
  constructor(private http: HttpClient) { }

  crearCalificacionContrato(datosCalificacionContrato: CalificacionContrato): Observable<CalificacionContrato> {
    return this.http.post<CalificacionContrato>(`${this.API_URL}/calificacion/crear`, datosCalificacionContrato);
  }

  consultaCalificacionesContratante(idContratante: number): Observable<CalificacionContrato[]> {
    return this.http.get<CalificacionContrato[]>(`${this.API_URL}/calificacion/${idContratante}`);
  }

  consultaCalificacionesGeneral(): Observable<CalificacionContrato[]> {
    return this.http.get<CalificacionContrato[]>(`${this.API_URL}/calificacion/todos`);
  }

  editarCalificacion(datosCalificacionContrato: CalificacionContrato): Observable<any> {
    return this.http.put(`${this.API_URL}/calificacion/editar`, datosCalificacionContrato).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error('Error al actualizar calificacionContrato: ' + error.message));
      })
    );
  }

}
