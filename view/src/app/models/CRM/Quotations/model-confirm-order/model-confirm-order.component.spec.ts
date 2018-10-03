import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelConfirmOrderComponent } from './model-confirm-order.component';

describe('ModelConfirmOrderComponent', () => {
  let component: ModelConfirmOrderComponent;
  let fixture: ComponentFixture<ModelConfirmOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelConfirmOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelConfirmOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
