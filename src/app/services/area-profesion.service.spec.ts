import { TestBed } from '@angular/core/testing';

import { AreaProfesionService } from './area-profesion.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AreaProfesionService', () => {
  let service: AreaProfesionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AreaProfesionService]
    });
    service = TestBed.inject(AreaProfesionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
