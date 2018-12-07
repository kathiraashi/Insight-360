import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsIncomeComponent } from './accounts-income.component';

describe('AccountsIncomeComponent', () => {
  let component: AccountsIncomeComponent;
  let fixture: ComponentFixture<AccountsIncomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountsIncomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
