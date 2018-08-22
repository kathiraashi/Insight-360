import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsConfigComponent } from './accounts-config.component';

describe('AccountsConfigComponent', () => {
  let component: AccountsConfigComponent;
  let fixture: ComponentFixture<AccountsConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountsConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
