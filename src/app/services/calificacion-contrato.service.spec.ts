import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment.development';

import { CalificacionContratoService } from './calificacion-contrato.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CalificacionContrato } from '../models/calificacionContrato';

describe('CalificacionContratoService', () => {
  let service: CalificacionContratoService;
  const API_URL = environment.urlApi;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CalificacionContratoService]
    });
    service = TestBed.inject(CalificacionContratoService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Test for crearCalificacionContrato
  it('debería crear una calificación de contrato', () => {
    const mockCalificacionContrato: CalificacionContrato = { ID_CALIFICACION: 0,
      NIVEL_CALIFICACION : 0,
      COMENTARIO: '',
      ID_USUARIO_TRABAJADOR: 123,    
      ID_CONTRATO: 12 };
    const mockResponse: CalificacionContrato = { ID_CALIFICACION: 1,
      NIVEL_CALIFICACION : 0,
      COMENTARIO: '',
      ID_USUARIO_TRABAJADOR: 123,    
      ID_CONTRATO: 12
     };

    service.crearCalificacionContrato(mockCalificacionContrato).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpController.expectOne(`${API_URL}/calificacion/crear`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockCalificacionContrato);
    req.flush(mockResponse);
  });

  // Test for consultaCalificacionesContratante
  it('debería recuperar calificaciones para un contratante', () => {
    const mockIdContratante = 1;
    const mockResponse: CalificacionContrato[] = [{  ID_CALIFICACION: 1,
      NIVEL_CALIFICACION : 0,
      COMENTARIO: '',
      ID_USUARIO_TRABAJADOR: 123,    
      ID_CONTRATO: 12 }];

    service.consultaCalificacionesContratante(mockIdContratante).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpController.expectOne(`${API_URL}/calificacion/${mockIdContratante}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('debería recuperar calificaciones generales', () => {
    const mockResponse: CalificacionContrato[] = [{  ID_CALIFICACION: 1,
      NIVEL_CALIFICACION : 0,
      COMENTARIO: '',
      ID_USUARIO_TRABAJADOR: 123,    
      ID_CONTRATO: 12 }];

    service.consultaCalificacionesGeneral().subscribe(calificaciones => {
      expect(calificaciones).toEqual(mockResponse);
    });

    const req = httpController.expectOne(`${API_URL}/calificacion/todos`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('debería editar un contrato de calificación', () => {
    const mockCalificacionContrato: CalificacionContrato = {  ID_CALIFICACION: 1,
      NIVEL_CALIFICACION : 0,
      COMENTARIO: '',
      ID_USUARIO_TRABAJADOR: 123,    
      ID_CONTRATO: 12 };
    const mockResponse = {  ID_CALIFICACION: 1,
      NIVEL_CALIFICACION : 9,
      COMENTARIO: 'buen trabajo, recomendado',
      ID_USUARIO_TRABAJADOR: 123,    
      ID_CONTRATO: 12 };

    service.editarCalificacion(mockCalificacionContrato).subscribe(response => {
      expect(response).toEqual(mockResponse);
    }, error => {
      // Handle expected error here if necessary
    });

    const req = httpController.expectOne(`${API_URL}/calificacion/editar`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockCalificacionContrato);

    // Simulate a response or an error from the server
    req.flush(mockResponse); // To simulate successful response
    // req.flush('Error message', { status: 400, statusText: 'Bad Request' }); // To simulate server error
  });

});
