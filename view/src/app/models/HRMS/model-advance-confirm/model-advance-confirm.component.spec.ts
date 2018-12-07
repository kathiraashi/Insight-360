import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelAdvanceConfirmComponent } from './model-advance-confirm.component';

describe('ModelAdvanceConfirmComponent', () => {
  let component: ModelAdvanceConfirmComponent;
  let fixture: ComponentFixture<ModelAdvanceConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelAdvanceConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelAdvanceConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
