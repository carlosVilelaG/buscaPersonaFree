import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {
  private API_ENDPOINT_USER = environment.urlApi +'/usuario';
  constructor(private http: HttpClient) { }

  obtenerUbicacionUsuarioPorEmail(email: string): Observable<any> {
    return this.http.get(`${this.API_ENDPOINT_USER}/ubicacion/${email}`).pipe(
      catchError(this.handleUbicacionError)
    );
  }
  
  private handleUbicacionError(error: HttpErrorResponse): Observable<never> {
    console.error('Error occurrido:', error.error.message);
    return throwError(() => new Error('No se pudo obtener la ubicación'));
  }
}
