import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsShowComponent } from './details-show.component';

describe('DetailsShowComponent', () => {
  let component: DetailsShowComponent;
  let fixture: ComponentFixture<DetailsShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
