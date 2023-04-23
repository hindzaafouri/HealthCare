import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTemplateClientComponent } from './all-template-client.component';

describe('AllTemplateClientComponent', () => {
  let component: AllTemplateClientComponent;
  let fixture: ComponentFixture<AllTemplateClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllTemplateClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTemplateClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
