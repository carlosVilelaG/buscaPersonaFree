import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment.development';
import { UbicacionService } from './ubicacion.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('UbicacionService', () => {
  let service: UbicacionService;
  const API_ENDPOINT_USER = environment.urlApi +'/usuario';
  let httpController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UbicacionService]
    });
    service = TestBed.inject(UbicacionService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Debería recuperar la ubicación del usuario por correo electrónico', () => {
    const mockEmail = 'test@example.com';
    const mockResponse = { /* datos de ubicación simulados */ };
  
    service.obtenerUbicacionUsuarioPorEmail(mockEmail).subscribe(data => {
      expect(data).toEqual(mockResponse);
    });
  
    const req = httpController.expectOne(`${API_ENDPOINT_USER}/ubicacion/${mockEmail}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockResponse);
  });

  it('Deberia guardar o actualizar la ubicación del usuario', () => {
    const mockUbicacion = { identificacion_usuario:'0909262698',
      telefono: '0989968908',
      latitud: '-2.24334',
      longitud : '-79.89326',
      estado: 'ACTIVO',
      descripcion: 'prueba' };
    const mockResponse = { /* respuesta simulada */ };
  
    service.guardaActualizaUbicacion(mockUbicacion).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });
  
    const req = httpController.expectOne(`${API_ENDPOINT_USER}/ubicacion`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(mockUbicacion);
    req.flush(mockResponse);
  });

});
