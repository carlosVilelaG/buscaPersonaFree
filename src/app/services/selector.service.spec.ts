import { TestBed } from '@angular/core/testing';

import { SelectorService } from './selector.service';

describe('SelectorService', () => {
  let service: SelectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('debería devolver tipos de identificación', () => {
    const tiposIdentificacion = service.getTiposIdentificacion();
    expect(tiposIdentificacion.length).toBeGreaterThan(0);
    expect(tiposIdentificacion).toEqual(jasmine.any(Array));
  
  });

  it('debería devolver tipos de rol', () => {
    const tiposRol = service.getTiposRol();
    expect(tiposRol.length).toBeGreaterThan(0);
    expect(tiposRol).toEqual(jasmine.any(Array));
  
  });

  it('debería devolver areas de profesión', () => {
    const areasProfesion = service.getAreProfesiones();
    expect(areasProfesion.length).toBeGreaterThan(0);
    expect(areasProfesion).toEqual(jasmine.any(Array));
  
  });

  it('debería devolver tipos de contrato', () => {
    const tiposContrato = service.getTiposContrato();
    expect(tiposContrato.length).toBeGreaterThan(0);
    expect(tiposContrato).toEqual(jasmine.any(Array));
  
  });

  it('debería devolver tipos de contrato', () => {
    const estadoContrato = service.getEstadosContrato();
    expect(estadoContrato.length).toBeGreaterThan(0);
    expect(estadoContrato).toEqual(jasmine.any(Array));
  
  });
  it('debería devolver tipos de contrato', () => {
    const nivelCalificacion = service.getNivelCalificacion();
    expect(nivelCalificacion.length).toBeGreaterThan(0);
    expect(nivelCalificacion).toEqual(jasmine.any(Array));
  
  });

});
