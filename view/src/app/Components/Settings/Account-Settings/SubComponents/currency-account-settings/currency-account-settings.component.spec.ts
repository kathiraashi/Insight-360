import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyAccountSettingsComponent } from './currency-account-settings.component';

describe('CurrencyAccountSettingsComponent', () => {
  let component: CurrencyAccountSettingsComponent;
  let fixture: ComponentFixture<CurrencyAccountSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrencyAccountSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyAccountSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
