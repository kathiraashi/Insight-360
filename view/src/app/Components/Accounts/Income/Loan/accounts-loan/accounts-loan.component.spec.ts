import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsLoanComponent } from './accounts-loan.component';

describe('AccountsLoanComponent', () => {
  let component: AccountsLoanComponent;
  let fixture: ComponentFixture<AccountsLoanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountsLoanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
