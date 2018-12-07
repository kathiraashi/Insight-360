import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelConfirmDeliverComponent } from './model-confirm-deliver.component';

describe('ModelConfirmDeliverComponent', () => {
  let component: ModelConfirmDeliverComponent;
  let fixture: ComponentFixture<ModelConfirmDeliverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelConfirmDeliverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelConfirmDeliverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
