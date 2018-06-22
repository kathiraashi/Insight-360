import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrdersCreateComponent } from './purchase-orders-create.component';

describe('PurchaseOrdersCreateComponent', () => {
  let component: PurchaseOrdersCreateComponent;
  let fixture: ComponentFixture<PurchaseOrdersCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseOrdersCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseOrdersCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
