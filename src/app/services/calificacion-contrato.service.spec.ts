import { TestBed } from '@angular/core/testing';

import { CalificacionContratoService } from './calificacion-contrato.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CalificacionContratoService', () => {
  let service: CalificacionContratoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CalificacionContratoService]
    });
    service = TestBed.inject(CalificacionContratoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
