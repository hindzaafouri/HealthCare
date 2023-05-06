import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationdetailsComponent } from './consultationdetails.component';

describe('ConsultationdetailsComponent', () => {
  let component: ConsultationdetailsComponent;
  let fixture: ComponentFixture<ConsultationdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultationdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultationdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
