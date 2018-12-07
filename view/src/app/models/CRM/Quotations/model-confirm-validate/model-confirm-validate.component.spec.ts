import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelConfirmValidateComponent } from './model-confirm-validate.component';

describe('ModelConfirmValidateComponent', () => {
  let component: ModelConfirmValidateComponent;
  let fixture: ComponentFixture<ModelConfirmValidateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelConfirmValidateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelConfirmValidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
