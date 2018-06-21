import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleorderCrmCustomersViewComponent } from './saleorder-crm-customers-view.component';

describe('SaleorderCrmCustomersViewComponent', () => {
  let component: SaleorderCrmCustomersViewComponent;
  let fixture: ComponentFixture<SaleorderCrmCustomersViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleorderCrmCustomersViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleorderCrmCustomersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
