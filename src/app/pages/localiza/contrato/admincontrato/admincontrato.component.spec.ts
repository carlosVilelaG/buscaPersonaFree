import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmincontratoComponent } from './admincontrato.component';

describe('AdmincontratoComponent', () => {
  let component: AdmincontratoComponent;
  let fixture: ComponentFixture<AdmincontratoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
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
