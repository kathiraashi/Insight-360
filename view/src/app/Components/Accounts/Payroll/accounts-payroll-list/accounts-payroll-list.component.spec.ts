import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsPayrollListComponent } from './accounts-payroll-list.component';

describe('AccountsPayrollListComponent', () => {
  let component: AccountsPayrollListComponent;
  let fixture: ComponentFixture<AccountsPayrollListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountsPayrollListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsPayrollListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
