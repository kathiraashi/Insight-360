import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseQuotationsViewComponent } from './purchase-quotations-view.component';

describe('PurchaseQuotationsViewComponent', () => {
  let component: PurchaseQuotationsViewComponent;
  let fixture: ComponentFixture<PurchaseQuotationsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseQuotationsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseQuotationsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
