import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment.development';
import { UsuarioService } from './usuario.service';

describe('UsuarioService', () => {
  let service: UsuarioService;
  let httpController: HttpTestingController;
  const API_ENDPOINT_USER = environment.urlApi +'/usuario';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsuarioService]
    });
    service = TestBed.inject(UsuarioService);
    httpController = TestBed.inject(HttpTestingController);

  });
  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Login correcto', () => {
    const mockUser = { email: 'test@example.com', password: 'password123' };

    service.login(mockUser.email, mockUser.password).subscribe(user => {
      expect(user).toBeTruthy();
      expect(user.email).toEqual(mockUser.email);
    });

    const req = httpController.expectOne(`${API_ENDPOINT_USER}/login`);
    expect(req.request.method).toEqual('POST');
    req.flush(mockUser);
  });

  it('Consulta de usuario por nombre correcto', () => {
    const mockUserId = 1;
    const mockUserName = 'John Doe';
  
    service.consultaNombreUsuario(mockUserId).subscribe(nombre => {
      expect(nombre).toEqual(mockUserName);
    });
  
    const req = httpController.expectOne(`${API_ENDPOINT_USER}/nombreusuario/${mockUserId}`);
    expect(req.request.method).toEqual('GET');
    req.flush({ nombre: mockUserName });
  });

  it('creacion correcta de usuario', () => {
    const mockUsuario = { id: 0, nombres: 'John Doe', email: 'john@example.com', 
                          password: '12345', rol: 1, estado: 'activo',
                          identificacion:'0909262659',tipoIdentificacion:'CEDULA'};
    const mockPerfil = { id_perfil: 1, id_usuario: 1, profesion: 2, tiempo_experiencia: '2 años',    
                         introduccion: 'trabajador de plomeria' };
  
    service.crearUsuario(mockUsuario, mockPerfil).subscribe(response => {
      expect(response).toBeTruthy();
    });
  
    const req = httpController.expectOne(`${API_ENDPOINT_USER}/crear`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual({ usuario: mockUsuario, perfil: mockPerfil });
    req.flush({ id: 1, nombres: 'John Doe', email: 'john@example.com', 
    password: '12345', rol: 1, estado: 'activo',
    identificacion:'0909262659',tipoIdentificacion:'CEDULA' });
  });
});
