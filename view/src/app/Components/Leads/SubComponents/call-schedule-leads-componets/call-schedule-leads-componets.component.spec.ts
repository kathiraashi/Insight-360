import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallScheduleLeadsComponetsComponent } from './call-schedule-leads-componets.component';

describe('CallScheduleLeadsComponetsComponent', () => {
  let component: CallScheduleLeadsComponetsComponent;
  let fixture: ComponentFixture<CallScheduleLeadsComponetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallScheduleLeadsComponetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallScheduleLeadsComponetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
