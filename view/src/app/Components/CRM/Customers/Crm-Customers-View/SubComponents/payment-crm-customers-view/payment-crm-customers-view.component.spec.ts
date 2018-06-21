import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentCrmCustomersViewComponent } from './payment-crm-customers-view.component';

describe('PaymentCrmCustomersViewComponent', () => {
  let component: PaymentCrmCustomersViewComponent;
  let fixture: ComponentFixture<PaymentCrmCustomersViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentCrmCustomersViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentCrmCustomersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
