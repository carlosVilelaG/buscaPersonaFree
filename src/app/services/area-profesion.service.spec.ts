import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment.development';
import { AreaProfesionService } from './area-profesion.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AreaProfesion } from '../models/areaprofesion';

describe('AreaProfesionService', () => {
  let service: AreaProfesionService;
  let httpController: HttpTestingController;
  const API_URL = environment.urlApi + '/profesion';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AreaProfesionService]
    });
    service = TestBed.inject(AreaProfesionService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('debe recuperar todos los datos de área y profesión', () => {
    const mockResponse: AreaProfesion[] = [{ id_area: 1,
      nombre_area_profesion: 'TECNOLOGIA',
      descripcion: 'PROFESION DEDICADA A LA TECNOLOGIA EN GENERAL',
      estado: 'ACTIVO' }];
      	
    service.obtenerAreaYProfesion().subscribe(data => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpController.expectOne(`${API_URL}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('debe recuperar datos de área y profesión por identificación', () => {
    const mockId = 1;
    const mockResponse: AreaProfesion = { id_area: 1,
      nombre_area_profesion: 'TECNOLOGIA',
      descripcion: 'PROFESION DEDICADA A LA TECNOLOGIA EN GENERAL',
      estado: 'ACTIVO' };

    service.obtenerAreaProfesionPorId(mockId).subscribe(data => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpController.expectOne(`${API_URL}/${mockId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

});
