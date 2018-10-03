import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelIncomeComponent } from './model-income.component';

describe('ModelIncomeComponent', () => {
  let component: ModelIncomeComponent;
  let fixture: ComponentFixture<ModelIncomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelIncomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
