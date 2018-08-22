import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelLocationsInventorySettingsComponent } from './model-locations-inventory-settings.component';

describe('ModelLocationsInventorySettingsComponent', () => {
  let component: ModelLocationsInventorySettingsComponent;
  let fixture: ComponentFixture<ModelLocationsInventorySettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelLocationsInventorySettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelLocationsInventorySettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
