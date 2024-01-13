import { TestBed } from '@angular/core/testing';

import { PerfiltrabajoService } from './perfiltrabajo.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PerfiltrabajoService', () => {
  let service: PerfiltrabajoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PerfiltrabajoService]
    });
    service = TestBed.inject(PerfiltrabajoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
