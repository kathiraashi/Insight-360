import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WareHouseInventorySettingsComponent } from './ware-house-inventory-settings.component';

describe('WareHouseInventorySettingsComponent', () => {
  let component: WareHouseInventorySettingsComponent;
  let fixture: ComponentFixture<WareHouseInventorySettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WareHouseInventorySettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WareHouseInventorySettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
