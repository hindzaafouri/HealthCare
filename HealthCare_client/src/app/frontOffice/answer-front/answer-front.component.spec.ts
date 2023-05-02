import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerFrontComponent } from './answer-front.component';

describe('AnswerFrontComponent', () => {
  let component: AnswerFrontComponent;
  let fixture: ComponentFixture<AnswerFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnswerFrontComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
