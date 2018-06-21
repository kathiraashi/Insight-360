import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorQuoteTermsPurchaseSettingsComponent } from './vendor-quote-terms-purchase-settings.component';

describe('VendorQuoteTermsPurchaseSettingsComponent', () => {
  let component: VendorQuoteTermsPurchaseSettingsComponent;
  let fixture: ComponentFixture<VendorQuoteTermsPurchaseSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorQuoteTermsPurchaseSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorQuoteTermsPurchaseSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
