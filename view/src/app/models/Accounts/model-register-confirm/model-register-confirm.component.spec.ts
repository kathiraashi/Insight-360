import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelRegisterConfirmComponent } from './model-register-confirm.component';

describe('ModelRegisterConfirmComponent', () => {
  let component: ModelRegisterConfirmComponent;
  let fixture: ComponentFixture<ModelRegisterConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelRegisterConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelRegisterConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
