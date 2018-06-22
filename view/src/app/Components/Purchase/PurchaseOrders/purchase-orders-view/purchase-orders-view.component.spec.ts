import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrdersViewComponent } from './purchase-orders-view.component';

describe('PurchaseOrdersViewComponent', () => {
  let component: PurchaseOrdersViewComponent;
  let fixture: ComponentFixture<PurchaseOrdersViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseOrdersViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseOrdersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
