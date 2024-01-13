import { TestBed } from '@angular/core/testing';

import { UbicacionService } from './ubicacion.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UbicacionService', () => {
  let service: UbicacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UbicacionService]
    });
    service = TestBed.inject(UbicacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
