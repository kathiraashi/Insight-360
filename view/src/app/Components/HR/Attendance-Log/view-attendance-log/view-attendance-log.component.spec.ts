import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAttendanceLogComponent } from './view-attendance-log.component';

describe('ViewAttendanceLogComponent', () => {
  let component: ViewAttendanceLogComponent;
  let fixture: ComponentFixture<ViewAttendanceLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAttendanceLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAttendanceLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
