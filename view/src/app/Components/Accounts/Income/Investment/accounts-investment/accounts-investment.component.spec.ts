import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsInvestmentComponent } from './accounts-investment.component';

describe('AccountsInvestmentComponent', () => {
  let component: AccountsInvestmentComponent;
  let fixture: ComponentFixture<AccountsInvestmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountsInvestmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsInvestmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
