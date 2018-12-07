import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsCashRegisterComponent } from './accounts-cash-register.component';

describe('AccountsCashRegisterComponent', () => {
  let component: AccountsCashRegisterComponent;
  let fixture: ComponentFixture<AccountsCashRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountsCashRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsCashRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
