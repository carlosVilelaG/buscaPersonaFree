import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilTrabajadorComponent } from './perfil-trabajador.component';

describe('PerfilTrabajadorComponent', () => {
  let component: PerfilTrabajadorComponent;
  let fixture: ComponentFixture<PerfilTrabajadorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
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
