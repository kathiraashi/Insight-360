import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLogPhoneCallComponent } from './create-log-phone-call.component';

describe('CreateLogPhoneCallComponent', () => {
  let component: CreateLogPhoneCallComponent;
  let fixture: ComponentFixture<CreateLogPhoneCallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateLogPhoneCallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLogPhoneCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
