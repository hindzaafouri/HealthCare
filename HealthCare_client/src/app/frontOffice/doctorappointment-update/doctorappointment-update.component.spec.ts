import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorappointmentUpdateComponent } from './doctorappointment-update.component';

describe('DoctorappointmentUpdateComponent', () => {
  let component: DoctorappointmentUpdateComponent;
  let fixture: ComponentFixture<DoctorappointmentUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorappointmentUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorappointmentUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
