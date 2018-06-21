import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmSaleorderListComponent } from './crm-saleorder-list.component';

describe('CrmSaleorderListComponent', () => {
  let component: CrmSaleorderListComponent;
  let fixture: ComponentFixture<CrmSaleorderListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmSaleorderListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmSaleorderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
