import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsIncomeViewComponent } from './accounts-income-view.component';

describe('AccountsIncomeViewComponent', () => {
  let component: AccountsIncomeViewComponent;
  let fixture: ComponentFixture<AccountsIncomeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountsIncomeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsIncomeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
