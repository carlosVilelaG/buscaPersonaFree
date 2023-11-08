import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Perfiltrabajador } from '../models/perfiltrabajador';
import { environment } from 'src/environments/environment.development';

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

  
}
