import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientfileAdminComponent } from './patientfile-admin.component';

describe('PatientfileAdminComponent', () => {
  let component: PatientfileAdminComponent;
  let fixture: ComponentFixture<PatientfileAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientfileAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientfileAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
