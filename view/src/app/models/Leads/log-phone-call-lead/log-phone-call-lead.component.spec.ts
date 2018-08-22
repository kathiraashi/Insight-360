import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogPhoneCallLeadComponent } from './log-phone-call-lead.component';

describe('LogPhoneCallLeadComponent', () => {
  let component: LogPhoneCallLeadComponent;
  let fixture: ComponentFixture<LogPhoneCallLeadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogPhoneCallLeadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogPhoneCallLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
