import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAttendanceLogComponent } from './create-attendance-log.component';

describe('CreateAttendanceLogComponent', () => {
  let component: CreateAttendanceLogComponent;
  let fixture: ComponentFixture<CreateAttendanceLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAttendanceLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAttendanceLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
