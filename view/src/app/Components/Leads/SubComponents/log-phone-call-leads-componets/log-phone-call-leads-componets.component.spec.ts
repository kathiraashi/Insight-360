import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogPhoneCallLeadsComponetsComponent } from './log-phone-call-leads-componets.component';

describe('LogPhoneCallLeadsComponetsComponent', () => {
  let component: LogPhoneCallLeadsComponetsComponent;
  let fixture: ComponentFixture<LogPhoneCallLeadsComponetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogPhoneCallLeadsComponetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogPhoneCallLeadsComponetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
