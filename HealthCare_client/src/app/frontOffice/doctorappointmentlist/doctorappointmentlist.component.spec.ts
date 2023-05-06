import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorappointmentlistComponent } from './doctorappointmentlist.component';

describe('DoctorappointmentlistComponent', () => {
  let component: DoctorappointmentlistComponent;
  let fixture: ComponentFixture<DoctorappointmentlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorappointmentlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorappointmentlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
