import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryDeliveryOrdersViewComponent } from './inventory-delivery-orders-view.component';

describe('InventoryDeliveryOrdersViewComponent', () => {
  let component: InventoryDeliveryOrdersViewComponent;
  let fixture: ComponentFixture<InventoryDeliveryOrdersViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryDeliveryOrdersViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryDeliveryOrdersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
