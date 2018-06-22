import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorBillsCreateComponent } from './vendor-bills-create.component';

describe('VendorBillsCreateComponent', () => {
  let component: VendorBillsCreateComponent;
  let fixture: ComponentFixture<VendorBillsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorBillsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorBillsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
