import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment.development';
import { PerfiltrabajoService } from './perfiltrabajo.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('PerfiltrabajoService', () => {
  const API_URL = environment.urlApi+'/perfilestrabajo';
  let service: PerfiltrabajoService;
  let httpController: HttpTestingController;
  
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PerfiltrabajoService]
    });
    service = TestBed.inject(PerfiltrabajoService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('debería recuperar perfiles por profesión', () => {
    const mockProfesion = 'TECNOLOGIA';
    const mockResponse = [{ id: 2,
      nombres: 'Juan',
      email: 'test@example.com',
      identificacion: '0909262698',
      latitud: '-2.24334',
      longitud : '-79.89326',
      introduccion: 'profesional de TECNOLOGIA',
      profesion: 2,
      nombreProfesion: 'TECNOLOGIA' }];

    service.obtenerPerfilesPorProfesion(mockProfesion).subscribe(data => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpController.expectOne(`${API_URL}/${mockProfesion}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockResponse);
  });

  it('debería recuperar todos los perfiles profesionales', () => {
    const mockResponse = [{ id: 2,
      nombres: 'Juan',
      email: 'test@example.com',
      identificacion: '0909262698',
      latitud: '-2.24334',
      longitud : '-79.89326',
      introduccion: 'profesional de TECNOLOGIA',
      profesion: 2,
      nombreProfesion: 'TECNOLOGIA' }];

    service.obtenerPerfilesProfesion().subscribe(data => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpController.expectOne(API_URL);
    expect(req.request.method).toEqual('GET');
    req.flush(mockResponse);
  });

  it('debería recuperar perfiles por ID de usuario', () => {
    const mockIdUsuario = '123';
    const mockResponse = [{ id_perfil: 1,
    id_usuario: 123,
    profesion: 2,
    tiempo_experiencia: '2 años',    
    introduccion: 'profesional de varios años de exériencia' }];
  
    service.obtenerPerfilesPorIdUsuario(mockIdUsuario).subscribe(perfiles => {
      expect(perfiles).toEqual(mockResponse);
    });
  
    const req = httpController.expectOne(`${API_URL}/usuario/${mockIdUsuario}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockResponse);
  });

  it('debería guardar o actualizar un perfil', () => {
    const mockPerfil = {  id_perfil: 1,
      id_usuario: 123,
      profesion: 2,
      tiempo_experiencia: '2 años',    
      introduccion: 'profesional de varios años de exériencia' };
    const mockResponse = {  id_perfil: 1,
      id_usuario: 123,
      profesion: 2,
      tiempo_experiencia: '2 años',    
      introduccion: 'profesional de varios años de exériencia desde 2023' };
  
    service.guardaActualizaPerfil(mockPerfil).subscribe(response => {
      expect(response).toEqual(mockResponse);
      // Puedes añadir expectativas adicionales aquí si es necesario
    });
  
    const req = httpController.expectOne(`${API_URL}/usuario/registra_actualiza_perfil`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(mockPerfil);
    req.flush(mockResponse);
  });

});
