import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';
import { Perfil } from '../models/perfil';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  
  private userEmail = new BehaviorSubject<string>('');
  userEmail$ = this.userEmail.asObservable();

  private userId = new BehaviorSubject<number>(0);
  userId$ = this.userId.asObservable();

  private userName = new BehaviorSubject<string>('');
  userName$ = this.userName.asObservable();
  
  private userIdentificacion = new BehaviorSubject<string>('');
  userIdentificacion$ = this.userIdentificacion.asObservable();

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  /// inicialixo con un valor incial
  currentUserData: BehaviorSubject<Usuario> = new BehaviorSubject<Usuario>({
    id:0, nombres:'',email:'',password:'',
    rol:0,identificacion:'',tipoIdentificacion:''});

  private API_ENDPOINT_USER = environment.urlApi+'/usuario';

  constructor(private http: HttpClient) {}
  
  setUserEmail(email: string) {
    this.userEmail.next(email);
  }

  setUserId(id: number) {
    this.userId.next(id);
  }

  setUserName(name: string) {
    this.userName.next(name);
  }
  setUserIdentificacion(identificacion: string){
    this.userIdentificacion.next(identificacion);
  }

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

  crearUsuario(usuario: Usuario, perfil: Perfil): Observable<any> {
    const url = `${this.API_ENDPOINT_USER}/crear`;
    return this.http.post(url, { usuario, perfil }).pipe(
      catchError(this.handleCreUsuarioError)
    );
  }

  consultaNombreUsuario1(id_usuario: number): Observable<string> {
    return this.http.get<string>(`${this.API_ENDPOINT_USER}/nombreusuario/${id_usuario}`);        
  }

  consultaNombreUsuario(id_usuario: number): Observable<string> {
    return this.http.get<{ nombre: string }>(`${this.API_ENDPOINT_USER}/nombreusuario/${id_usuario}`)
      .pipe(
        map(response => response.nombre)
      );
  }


  private handleError(error : HttpErrorResponse) {
    let errorMsg = "Error en la conexión o la consulta ";
    console.log('Error desde servicio::',error.message);
    if (error.status === 401) {
      errorMsg = 'Credenciales inválidas';
    } else if (error.status === 402) {
      errorMsg = 'Usuario no existe.';
    } else if (error.status === 500) {
      errorMsg = 'Error al verificar la contraseña';
    }
    return throwError(() => new Error(errorMsg));
  }

  private handleCreUsuarioError(error : HttpErrorResponse) {
    let errorMsg = "Error en la conexión para crear el usuario ";
    
    if (error.status === 500) {
      errorMsg = 'Error al crear el usuario con su perfil';
    }
    return throwError(() => new Error(errorMsg));
  }

  get usuarioData():Observable<Usuario>{
     return this.currentUserData.asObservable(); 
  }

  get usuarioLoginOn():Observable<boolean>{
    return this.currentUserLoginOn.asObservable(); 
 }

 // Método para inicializar valores
 initializeUserDetails() {
  this.setUserEmail('');
  this.setUserId(0);
  this.setUserName('');
  this.setUserIdentificacion('');
  this.currentUserLoginOn.next(false);
  this.currentUserData.next({
    id: 0, nombres: '', email: '', password: '', 
    rol: 0, identificacion: '', tipoIdentificacion: ''
  });
}
}

