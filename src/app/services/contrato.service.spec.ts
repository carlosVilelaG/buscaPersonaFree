import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment.development';
import { ContratoService } from './contrato.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Contrato } from '../models/contrato';

describe('ContratoService', () => {
  let service: ContratoService;
  const API_URL = environment.urlApi;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ContratoService]
    });
    service = TestBed.inject(ContratoService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('debería crear un contrato', () => {
    const mockContrato: Contrato = { id_contrato: 0 ,
      id_usuario_contratante: 1,
      estado: 'CONTRATADO',
      tipo_contrato : 2,
      id_usuario_trabajador: 2,
      fecha_inicio: '2023-11-01 00:00:00',
      fecha_fin:'2023-14-01 00:00:00',
      descripcion: 'trabajo de albañileria por 2 dias',
      comentario: '' };

    const mockResponse: Contrato = { id_contrato: 123,
      id_usuario_contratante: 1,
      estado: 'CONTRATADO',
      tipo_contrato : 2,
      id_usuario_trabajador: 2,
      fecha_inicio: '2023-11-01 00:00:00',
      fecha_fin:'2023-14-01 00:00:00',
      descripcion: 'trabajo de albañileria por 2 dias',
      comentario: '' };

    service.crearContrato(mockContrato).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpController.expectOne(`${API_URL}/contrato/crear`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockContrato);
    req.flush(mockResponse);
  });


  it('debería recuperar contratos relacionados con un usuario', () => {
    const mockUserId = 1;
    const mockResponse = [{id_contrato: 123,
      id_usuario_contratante: 1,
      estado: 'CONTRATADO',
      tipo_contrato : 2,
      id_usuario_trabajador: 2,
      fecha_inicio: '2023-11-01 00:00:00',
      fecha_fin:'2023-14-01 00:00:00',
      descripcion: 'trabajo de albañileria por 2 dias',
      comentario: '' }];

    service.consultaContratoUsuarioRelacionado(mockUserId).subscribe(contratos => {
      expect(contratos).toEqual(mockResponse);
    });

    const req = httpController.expectOne(`${API_URL}/contrato/relacionado/${mockUserId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('debe recuperar contratos relacionados con un usuario', () => {
    const mockUserId = 1;
    const mockResponse: Contrato[] = [{id_contrato: 123,
      id_usuario_contratante: 1,
      estado: 'TERMINADO',
      tipo_contrato : 2,
      id_usuario_trabajador: 2,
      fecha_inicio: '2023-11-01 00:00:00',
      fecha_fin:'2023-14-01 00:00:00',
      descripcion: 'trabajo de albañileria por 2 dias',
      comentario: ''}];

    service.consultaContratoUsuarioRelacionado(mockUserId).subscribe(contratos => {
      expect(contratos).toEqual(mockResponse);
    });

    const req = httpController.expectOne(`${API_URL}/contrato/relacionado/${mockUserId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('debería recuperar contratos generales relacionados con un usuario', () => {
    const mockUserId = 1;
    const mockResponse = [{ id_contrato: 123,
      id_usuario_contratante: 1,
      estado: 'TERMINADO',
      tipo_contrato : 2,
      id_usuario_trabajador: 2,
      fecha_inicio: '2023-11-01 00:00:00',
      fecha_fin:'2023-14-01 00:00:00',
      descripcion: 'trabajo de albañileria por 2 dias',
      comentario: '' } ];

    service.consultaContratoGeneralRelacionado(mockUserId).subscribe(contratos => {
      expect(contratos).toEqual(mockResponse);
    });

    const req = httpController.expectOne(`${API_URL}/contrato/general/${mockUserId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('debería editar un contrato', () => {
    const mockContrato: Contrato = { id_contrato: 123,
      id_usuario_contratante: 1,
      estado: 'CONTRATADO',
      tipo_contrato : 2,
      id_usuario_trabajador: 2,
      fecha_inicio: '2023-11-01 00:00:00',
      fecha_fin:'2023-14-01 00:00:00',
      descripcion: 'trabajo de albañileria por 2 dias',
      comentario: '' };
    const mockResponse = {id_contrato: 123,
      id_usuario_contratante: 1,
      estado: 'TERMINADO',
      tipo_contrato : 2,
      id_usuario_trabajador: 2,
      fecha_inicio: '2023-11-01 00:00:00',
      fecha_fin:'2023-14-01 00:00:00',
      descripcion: 'trabajo de albañileria por 2 dias',
      comentario: 'SE TERMINA POR PRUEBAS' };

    service.editarContrato(mockContrato).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpController.expectOne(`${API_URL}/contrato/editar`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockContrato);
    req.flush(mockResponse);
  });


  

});
