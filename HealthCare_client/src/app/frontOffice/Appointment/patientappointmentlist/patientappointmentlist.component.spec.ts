import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientappointmentlistComponent } from './patientappointmentlist.component';

describe('PatientappointmentlistComponent', () => {
  let component: PatientappointmentlistComponent;
  let fixture: ComponentFixture<PatientappointmentlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientappointmentlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientappointmentlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
