import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableConsultationsComponent } from './table-consultations.component';

describe('TableConsultationsComponent', () => {
  let component: TableConsultationsComponent;
  let fixture: ComponentFixture<TableConsultationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableConsultationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableConsultationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
