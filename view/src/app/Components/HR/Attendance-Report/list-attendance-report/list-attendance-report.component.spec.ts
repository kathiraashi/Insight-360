import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAttendanceReportComponent } from './list-attendance-report.component';

describe('ListAttendanceReportComponent', () => {
  let component: ListAttendanceReportComponent;
  let fixture: ComponentFixture<ListAttendanceReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAttendanceReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAttendanceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
