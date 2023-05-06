import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientInterfaceComponent } from './patient-interface.component';

describe('PatientInterfaceComponent', () => {
  let component: PatientInterfaceComponent;
  let fixture: ComponentFixture<PatientInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientInterfaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
