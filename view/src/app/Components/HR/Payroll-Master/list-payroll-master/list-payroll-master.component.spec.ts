import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPayrollMasterComponent } from './list-payroll-master.component';

describe('ListPayrollMasterComponent', () => {
  let component: ListPayrollMasterComponent;
  let fixture: ComponentFixture<ListPayrollMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPayrollMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPayrollMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
