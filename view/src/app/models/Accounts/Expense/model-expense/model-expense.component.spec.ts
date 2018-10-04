import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelExpenseComponent } from './model-expense.component';

describe('ModelExpenseComponent', () => {
  let component: ModelExpenseComponent;
  let fixture: ComponentFixture<ModelExpenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelExpenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
