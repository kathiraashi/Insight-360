import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCallScheduleComponent } from './view-call-schedule.component';

describe('ViewCallScheduleComponent', () => {
  let component: ViewCallScheduleComponent;
  let fixture: ComponentFixture<ViewCallScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCallScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCallScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
