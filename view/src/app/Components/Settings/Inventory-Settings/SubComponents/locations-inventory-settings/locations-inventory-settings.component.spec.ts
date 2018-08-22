import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationsInventorySettingsComponent } from './locations-inventory-settings.component';

describe('LocationsInventorySettingsComponent', () => {
  let component: LocationsInventorySettingsComponent;
  let fixture: ComponentFixture<LocationsInventorySettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationsInventorySettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationsInventorySettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
