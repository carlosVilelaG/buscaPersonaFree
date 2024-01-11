import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalificaContratoComponent } from './califica-contrato.component';

describe('CalificaContratoComponent', () => {
  let component: CalificaContratoComponent;
  let fixture: ComponentFixture<CalificaContratoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalificaContratoComponent]
    });
    fixture = TestBed.createComponent(CalificaContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
