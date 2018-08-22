import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelCurrencyAccountSettingsComponent } from './model-currency-account-settings.component';

describe('ModelCurrencyAccountSettingsComponent', () => {
  let component: ModelCurrencyAccountSettingsComponent;
  let fixture: ComponentFixture<ModelCurrencyAccountSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelCurrencyAccountSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelCurrencyAccountSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
