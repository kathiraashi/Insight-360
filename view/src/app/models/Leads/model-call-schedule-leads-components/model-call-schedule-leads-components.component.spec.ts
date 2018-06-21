import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelCallScheduleLeadsComponentsComponent } from './model-call-schedule-leads-components.component';

describe('ModelCallScheduleLeadsComponentsComponent', () => {
  let component: ModelCallScheduleLeadsComponentsComponent;
  let fixture: ComponentFixture<ModelCallScheduleLeadsComponentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelCallScheduleLeadsComponentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelCallScheduleLeadsComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
