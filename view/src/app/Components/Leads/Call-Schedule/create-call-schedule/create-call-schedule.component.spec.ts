import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCallScheduleComponent } from './create-call-schedule.component';

describe('CreateCallScheduleComponent', () => {
  let component: CreateCallScheduleComponent;
  let fixture: ComponentFixture<CreateCallScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCallScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCallScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
