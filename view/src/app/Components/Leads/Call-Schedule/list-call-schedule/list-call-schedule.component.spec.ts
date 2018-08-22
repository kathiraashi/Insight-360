import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCallScheduleComponent } from './list-call-schedule.component';

describe('ListCallScheduleComponent', () => {
  let component: ListCallScheduleComponent;
  let fixture: ComponentFixture<ListCallScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCallScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCallScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
