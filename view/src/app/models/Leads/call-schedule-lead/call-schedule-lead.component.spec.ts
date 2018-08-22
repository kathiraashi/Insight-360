import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallScheduleLeadComponent } from './call-schedule-lead.component';

describe('CallScheduleLeadComponent', () => {
  let component: CallScheduleLeadComponent;
  let fixture: ComponentFixture<CallScheduleLeadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallScheduleLeadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallScheduleLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
