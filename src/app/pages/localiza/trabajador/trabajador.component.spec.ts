import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabajadorComponent } from './trabajador.component';
import { MapCustomService } from 'src/app/services/map-custom.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { WrappedSocket } from 'ngx-socket-io/src/socket-io.service';
import { of } from 'rxjs';
import { UbicacionService } from 'src/app/services/ubicacion.service';
import { UsuarioService } from 'src/app/services/usuario.service';
/*
describe('TrabajadorComponent', () => {
  let component: TrabajadorComponent;
  let fixture: ComponentFixture<TrabajadorComponent>;
  const mockSocket = {
    fromEvent: () => of({ coords: { lat: 0, lng: 0 } }), // Simula el método fromEvent
    // Añade aquí otros métodos y propiedades que necesites simular
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [TrabajadorComponent],
      providers: [MapCustomService,UbicacionService,
        UsuarioService,
        { provide: WrappedSocket, useValue: mockSocket }
      ]
    });
    fixture = TestBed.createComponent(TrabajadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
*/
// Define aquí tu mockWrappedSocket
const mockWrappedSocket = {
  // Propiedades y métodos simulados
};