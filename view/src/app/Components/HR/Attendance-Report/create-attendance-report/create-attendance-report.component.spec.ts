import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAttendanceReportComponent } from './create-attendance-report.component';

describe('CreateAttendanceReportComponent', () => {
  let component: CreateAttendanceReportComponent;
  let fixture: ComponentFixture<CreateAttendanceReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAttendanceReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAttendanceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
