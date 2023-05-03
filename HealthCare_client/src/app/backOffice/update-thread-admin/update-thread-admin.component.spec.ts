import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateThreadAdminComponent } from './update-thread-admin.component';

describe('UpdateThreadAdminComponent', () => {
  let component: UpdateThreadAdminComponent;
  let fixture: ComponentFixture<UpdateThreadAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateThreadAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateThreadAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
