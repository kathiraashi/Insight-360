import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAttendanceLogComponent } from './list-attendance-log.component';

describe('ListAttendanceLogComponent', () => {
  let component: ListAttendanceLogComponent;
  let fixture: ComponentFixture<ListAttendanceLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAttendanceLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAttendanceLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
