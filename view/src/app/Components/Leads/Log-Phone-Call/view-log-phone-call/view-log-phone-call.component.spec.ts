import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLogPhoneCallComponent } from './view-log-phone-call.component';

describe('ViewLogPhoneCallComponent', () => {
  let component: ViewLogPhoneCallComponent;
  let fixture: ComponentFixture<ViewLogPhoneCallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewLogPhoneCallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLogPhoneCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
