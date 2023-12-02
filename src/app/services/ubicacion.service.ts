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
    if (!email) {
      return throwError(() => new Error('Email no puede ser nulo o vacío'));
    }

    return this.http.get(`${this.API_ENDPOINT_USER}/ubicacion/${email}`).pipe(
      catchError(this.handleUbicacionError)
    );
  }
  
  private handleUbicacionError(error: HttpErrorResponse): Observable<never> {
    return throwError(() => new Error('No se pudo obtener la ubicación'));
  }
}
