import { TestBed } from '@angular/core/testing';

import { CalificacionContratoService } from './calificacion-contrato.service';

describe('CalificacionContratoService', () => {
  let service: CalificacionContratoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalificacionContratoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
