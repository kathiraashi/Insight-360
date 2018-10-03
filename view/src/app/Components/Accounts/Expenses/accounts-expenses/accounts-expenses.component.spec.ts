import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsExpensesComponent } from './accounts-expenses.component';

describe('AccountsExpensesComponent', () => {
  let component: AccountsExpensesComponent;
  let fixture: ComponentFixture<AccountsExpensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountsExpensesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
