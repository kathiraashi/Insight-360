import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsVendorViewComponent } from './payments-vendor-view.component';

describe('PaymentsVendorViewComponent', () => {
  let component: PaymentsVendorViewComponent;
  let fixture: ComponentFixture<PaymentsVendorViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentsVendorViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsVendorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
