import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryDeliveryOrdersEditComponent } from './inventory-delivery-orders-edit.component';

describe('InventoryDeliveryOrdersEditComponent', () => {
  let component: InventoryDeliveryOrdersEditComponent;
  let fixture: ComponentFixture<InventoryDeliveryOrdersEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryDeliveryOrdersEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryDeliveryOrdersEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
