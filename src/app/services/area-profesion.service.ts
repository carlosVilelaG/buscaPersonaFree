import { Injectable } from '@angular/core';
import { AreaProfesion } from '../models/areaprofesion';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AreaProfesionService {
  private API_URL = environment.urlApi +'/profesion';
  constructor(private http: HttpClient) { }

  obtenerAreaYProfesion(): Observable<AreaProfesion[]> {  
    return this.http.get<AreaProfesion[]>(`${this.API_URL}`);
  }

  obtenerAreaProfesionPorId(id : number): Observable<AreaProfesion> {  
    return this.http.get<AreaProfesion>(`${this.API_URL}/${id}`);
  }

}
