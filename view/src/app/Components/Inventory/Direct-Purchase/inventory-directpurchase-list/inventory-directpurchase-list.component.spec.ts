import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryDirectpurchaseListComponent } from './inventory-directpurchase-list.component';

describe('InventoryDirectpurchaseListComponent', () => {
  let component: InventoryDirectpurchaseListComponent;
  let fixture: ComponentFixture<InventoryDirectpurchaseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryDirectpurchaseListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryDirectpurchaseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
