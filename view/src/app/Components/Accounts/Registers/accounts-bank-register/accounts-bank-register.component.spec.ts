import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsBankRegisterComponent } from './accounts-bank-register.component';

describe('AccountsBankRegisterComponent', () => {
  let component: AccountsBankRegisterComponent;
  let fixture: ComponentFixture<AccountsBankRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountsBankRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsBankRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
