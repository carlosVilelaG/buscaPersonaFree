import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Perfiltrabajador } from '../models/perfiltrabajador';
import { environment } from 'src/environments/environment.development';
import { Perfil } from '../models/perfil';

@Injectable({
  providedIn: 'root'
})
export class PerfiltrabajoService {
  
  private API_URL = environment.urlApi+'/perfilestrabajo';

  constructor(private http: HttpClient) { }

  obtenerPerfilesPorProfesion(profesion: string): Observable<Perfiltrabajador[]> {  
    return this.http.get<Perfiltrabajador[]>(`${this.API_URL}/${profesion}`);
  }

  obtenerPerfilesProfesion(): Observable<Perfiltrabajador[]> {  
    return this.http.get<Perfiltrabajador[]>(`${this.API_URL}`);
  }

  obtenerPerfilesPorIdUsuario(id_usuario : string):Observable<Perfil[]> {
    return this.http.get<Perfil[]>(`${this.API_URL}/usuario/${id_usuario}`);
  }

  guardaActualizaPerfil(perfil : Perfil): Observable<Perfil> {
    return this.http.post<Perfil>(this.API_URL+ '/usuario/registra_actualiza_perfil', perfil).pipe(
      tap((res: any) => {
        if (res.id_perfil && !perfil.id_perfil) {
          perfil.id_perfil = res.id_perfil;
        }
      }),
      catchError(this.handlePerfilError)
    ); 
  }

  private handlePerfilError(error: HttpErrorResponse) {    
    return throwError(() => new Error('Error en perfil: ' + error.message));
  }

}
