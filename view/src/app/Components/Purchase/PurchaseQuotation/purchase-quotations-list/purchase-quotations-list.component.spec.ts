import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseQuotationsListComponent } from './purchase-quotations-list.component';

describe('PurchaseQuotationsListComponent', () => {
  let component: PurchaseQuotationsListComponent;
  let fixture: ComponentFixture<PurchaseQuotationsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseQuotationsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseQuotationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
