import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment.development';
import { UsuarioService } from './usuario.service';

describe('UsuarioService', () => {
  let service: UsuarioService;
  let httpController: HttpTestingController;
  const API_ENDPOINT_USER = environment.urlApi +'/usuario';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsuarioService]
    });
    service = TestBed.inject(UsuarioService);
    httpController = TestBed.inject(HttpTestingController);

  });
  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login correctly', () => {
    const mockUser = { email: 'test@example.com', password: 'password123' };

    service.login(mockUser.email, mockUser.password).subscribe(user => {
      expect(user).toBeTruthy();
      expect(user.email).toEqual(mockUser.email);
    });

    const req = httpController.expectOne(`${API_ENDPOINT_USER}/login`);
    expect(req.request.method).toEqual('POST');
    req.flush(mockUser);
  });
});
