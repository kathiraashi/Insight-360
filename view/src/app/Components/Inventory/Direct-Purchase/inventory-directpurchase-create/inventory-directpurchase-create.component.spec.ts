import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryDirectpurchaseCreateComponent } from './inventory-directpurchase-create.component';

describe('InventoryDirectpurchaseCreateComponent', () => {
  let component: InventoryDirectpurchaseCreateComponent;
  let fixture: ComponentFixture<InventoryDirectpurchaseCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryDirectpurchaseCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryDirectpurchaseCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
