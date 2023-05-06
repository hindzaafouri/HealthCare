import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorInfosComponent } from './doctor-infos.component';

describe('DoctorInfosComponent', () => {
  let component: DoctorInfosComponent;
  let fixture: ComponentFixture<DoctorInfosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorInfosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
