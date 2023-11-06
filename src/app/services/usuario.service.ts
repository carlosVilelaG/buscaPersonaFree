import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  /// inicialixo con un valor incial
  currentUserData: BehaviorSubject<Usuario> = new BehaviorSubject<Usuario>({
    id:0, nombres:'',email:'',pasword:'',
    rol:0,identificacion:'',tipoIdentificacion:''});

  private API_ENDPOINT_USER = 'http://localhost:4000/localizador/usuario';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<Usuario> {
    const loginData = { email, password };
    return this.http.post<Usuario>(this.API_ENDPOINT_USER+ '/login', loginData).pipe(
      tap((userData : Usuario) =>{
        this.currentUserData.next(userData);
        this.currentUserLoginOn.next(true);
      }),
      map(usuario => {
        if (!usuario) {
          throw new Error('Credenciales inválidas o usuario no encontrado');
        }
        return usuario;
      }),
      catchError(this.handleError)
    );
  }

 

  private handleError(error : HttpErrorResponse) {
    let errorMsg = "Error en la conexión o la consulta ";
    
    if (error.status === 401) {
      errorMsg = 'Credenciales inválidas';
    } else if (error.status === 402) {
      errorMsg = 'Usuario no existe.';
    } else if (error.status === 500) {
      errorMsg = 'Error al verificar la contraseña';
    }
    return throwError(() => new Error(errorMsg));
  }

  get usuarioData():Observable<Usuario>{
     return this.currentUserData.asObservable(); 
  }

  get usuarioLoginOn():Observable<boolean>{
    return this.currentUserLoginOn.asObservable(); 
 }

}

