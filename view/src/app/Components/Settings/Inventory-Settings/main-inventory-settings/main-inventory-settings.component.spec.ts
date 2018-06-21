import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainInventorySettingsComponent } from './main-inventory-settings.component';

describe('MainInventorySettingsComponent', () => {
  let component: MainInventorySettingsComponent;
  let fixture: ComponentFixture<MainInventorySettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainInventorySettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainInventorySettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
