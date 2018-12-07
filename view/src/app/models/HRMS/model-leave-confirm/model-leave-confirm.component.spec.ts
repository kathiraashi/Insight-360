import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelLeaveConfirmComponent } from './model-leave-confirm.component';

describe('ModelLeaveConfirmComponent', () => {
  let component: ModelLeaveConfirmComponent;
  let fixture: ComponentFixture<ModelLeaveConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelLeaveConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelLeaveConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
