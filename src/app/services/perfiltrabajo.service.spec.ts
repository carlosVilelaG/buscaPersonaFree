import { TestBed } from '@angular/core/testing';

import { PerfiltrabajoService } from './perfiltrabajo.service';

describe('PerfiltrabajoService', () => {
  let service: PerfiltrabajoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerfiltrabajoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
