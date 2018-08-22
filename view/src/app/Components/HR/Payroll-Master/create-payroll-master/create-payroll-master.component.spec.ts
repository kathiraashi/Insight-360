import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePayrollMasterComponent } from './create-payroll-master.component';

describe('CreatePayrollMasterComponent', () => {
  let component: CreatePayrollMasterComponent;
  let fixture: ComponentFixture<CreatePayrollMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePayrollMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePayrollMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
