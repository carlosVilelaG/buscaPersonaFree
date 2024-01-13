import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilTrabajadorComponent } from './perfil-trabajador.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('PerfilTrabajadorComponent', () => {
  let component: PerfilTrabajadorComponent;
  let fixture: ComponentFixture<PerfilTrabajadorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [PerfilTrabajadorComponent]
    });
    fixture = TestBed.createComponent(PerfilTrabajadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
