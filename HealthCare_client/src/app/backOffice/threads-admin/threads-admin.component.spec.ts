import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadsAdminComponent } from './threads-admin.component';

describe('ThreadsAdminComponent', () => {
  let component: ThreadsAdminComponent;
  let fixture: ComponentFixture<ThreadsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreadsAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreadsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
