import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrdersVendorViewComponent } from './purchase-orders-vendor-view.component';

describe('PurchaseOrdersVendorViewComponent', () => {
  let component: PurchaseOrdersVendorViewComponent;
  let fixture: ComponentFixture<PurchaseOrdersVendorViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseOrdersVendorViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseOrdersVendorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
