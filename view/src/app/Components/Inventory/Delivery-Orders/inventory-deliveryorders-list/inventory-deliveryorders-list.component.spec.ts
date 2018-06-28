import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryDeliveryordersListComponent } from './inventory-deliveryorders-list.component';

describe('InventoryDeliveryordersListComponent', () => {
  let component: InventoryDeliveryordersListComponent;
  let fixture: ComponentFixture<InventoryDeliveryordersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryDeliveryordersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryDeliveryordersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
