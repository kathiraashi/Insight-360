import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOnDutyComponent } from './view-on-duty.component';

describe('ViewOnDutyComponent', () => {
  let component: ViewOnDutyComponent;
  let fixture: ComponentFixture<ViewOnDutyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewOnDutyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOnDutyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
