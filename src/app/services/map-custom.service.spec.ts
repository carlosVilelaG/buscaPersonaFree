import { TestBed } from '@angular/core/testing';

import { MapCustomService } from './map-custom.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MapCustomService', () => {
  let service: MapCustomService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MapCustomService]
    });
    service = TestBed.inject(MapCustomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
