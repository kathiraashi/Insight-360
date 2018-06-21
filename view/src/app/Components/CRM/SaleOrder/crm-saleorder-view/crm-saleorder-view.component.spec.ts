import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmSaleorderViewComponent } from './crm-saleorder-view.component';

describe('CrmSaleorderViewComponent', () => {
  let component: CrmSaleorderViewComponent;
  let fixture: ComponentFixture<CrmSaleorderViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmSaleorderViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmSaleorderViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
