import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStockValuesComponent } from './view-stock-values.component';

describe('ViewStockValuesComponent', () => {
  let component: ViewStockValuesComponent;
  let fixture: ComponentFixture<ViewStockValuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewStockValuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewStockValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
