import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmincontratoComponent } from './admincontrato.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AdmincontratoComponent', () => {
  let component: AdmincontratoComponent;
  let fixture: ComponentFixture<AdmincontratoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [AdmincontratoComponent]
    });
    fixture = TestBed.createComponent(AdmincontratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
