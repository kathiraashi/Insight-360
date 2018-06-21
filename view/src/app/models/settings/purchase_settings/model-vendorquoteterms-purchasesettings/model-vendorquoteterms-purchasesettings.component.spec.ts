import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelVendorquotetermsPurchasesettingsComponent } from './model-vendorquoteterms-purchasesettings.component';

describe('ModelVendorquotetermsPurchasesettingsComponent', () => {
  let component: ModelVendorquotetermsPurchasesettingsComponent;
  let fixture: ComponentFixture<ModelVendorquotetermsPurchasesettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelVendorquotetermsPurchasesettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelVendorquotetermsPurchasesettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
