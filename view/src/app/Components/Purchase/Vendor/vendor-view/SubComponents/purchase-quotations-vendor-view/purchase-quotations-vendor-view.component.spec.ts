import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseQuotationsVendorViewComponent } from './purchase-quotations-vendor-view.component';

describe('PurchaseQuotationsVendorViewComponent', () => {
  let component: PurchaseQuotationsVendorViewComponent;
  let fixture: ComponentFixture<PurchaseQuotationsVendorViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseQuotationsVendorViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseQuotationsVendorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
