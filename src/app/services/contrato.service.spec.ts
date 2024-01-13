import { TestBed } from '@angular/core/testing';

import { ContratoService } from './contrato.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ContratoService', () => {
  let service: ContratoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ContratoService]
    });
    service = TestBed.inject(ContratoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
