import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmSaleorderCreateComponent } from './crm-saleorder-create.component';

describe('CrmSaleorderCreateComponent', () => {
  let component: CrmSaleorderCreateComponent;
  let fixture: ComponentFixture<CrmSaleorderCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmSaleorderCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmSaleorderCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
