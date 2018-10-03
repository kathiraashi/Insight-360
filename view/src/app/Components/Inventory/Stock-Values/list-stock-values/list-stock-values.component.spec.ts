import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStockValuesComponent } from './list-stock-values.component';

describe('ListStockValuesComponent', () => {
  let component: ListStockValuesComponent;
  let fixture: ComponentFixture<ListStockValuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListStockValuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListStockValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
