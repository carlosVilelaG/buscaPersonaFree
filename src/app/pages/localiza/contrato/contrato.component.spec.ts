import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratoComponent } from './contrato.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('ContratoComponent', () => {
  let component: ContratoComponent;
  let fixture: ComponentFixture<ContratoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [ContratoComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({id: '123'}), // Simula parámetros de ruta si es necesario
            // Añade aquí otras propiedades simuladas de ActivatedRoute
          }
        }
      ]
    });
    fixture = TestBed.createComponent(ContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
