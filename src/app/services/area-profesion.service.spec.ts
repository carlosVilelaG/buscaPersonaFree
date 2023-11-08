import { TestBed } from '@angular/core/testing';

import { AreaProfesionService } from './area-profesion.service';

describe('AreaProfesionService', () => {
  let service: AreaProfesionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AreaProfesionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
