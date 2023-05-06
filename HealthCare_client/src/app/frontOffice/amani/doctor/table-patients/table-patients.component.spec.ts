import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePatientsComponent } from './table-patients.component';

describe('TablePatientsComponent', () => {
  let component: TablePatientsComponent;
  let fixture: ComponentFixture<TablePatientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablePatientsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablePatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
