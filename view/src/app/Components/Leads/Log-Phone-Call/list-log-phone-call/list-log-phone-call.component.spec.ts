import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLogPhoneCallComponent } from './list-log-phone-call.component';

describe('ListLogPhoneCallComponent', () => {
  let component: ListLogPhoneCallComponent;
  let fixture: ComponentFixture<ListLogPhoneCallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListLogPhoneCallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLogPhoneCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
