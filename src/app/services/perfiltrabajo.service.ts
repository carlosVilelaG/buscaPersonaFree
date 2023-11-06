import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Perfiltrabajador } from '../models/perfiltrabajador';

@Injectable({
  providedIn: 'root'
})
export class PerfiltrabajoService {
  
  private API_URL = 'http://localhost:4000/localizador/perfilestrabajo';

  constructor(private http: HttpClient) { }

  obtenerPerfilesPorProfesion(profesion: string): Observable<Perfiltrabajador[]> {  
    return this.http.get<Perfiltrabajador[]>(`${this.API_URL}/${profesion}`);
  }

  obtenerPerfilesProfesion(): Observable<Perfiltrabajador[]> {  
    return this.http.get<Perfiltrabajador[]>(`${this.API_URL}`);
  }

  
}
