import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorBillVendorViewComponent } from './vendor-bill-vendor-view.component';

describe('VendorBillVendorViewComponent', () => {
  let component: VendorBillVendorViewComponent;
  let fixture: ComponentFixture<VendorBillVendorViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorBillVendorViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorBillVendorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
