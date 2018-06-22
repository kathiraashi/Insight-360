import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorBillsViewComponent } from './vendor-bills-view.component';

describe('VendorBillsViewComponent', () => {
  let component: VendorBillsViewComponent;
  let fixture: ComponentFixture<VendorBillsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorBillsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorBillsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
