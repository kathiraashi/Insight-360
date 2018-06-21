import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPurchaseSettingsComponent } from './main-purchase-settings.component';

describe('MainPurchaseSettingsComponent', () => {
  let component: MainPurchaseSettingsComponent;
  let fixture: ComponentFixture<MainPurchaseSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainPurchaseSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPurchaseSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
