import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelOndutyConfirmComponent } from './model-onduty-confirm.component';

describe('ModelOndutyConfirmComponent', () => {
  let component: ModelOndutyConfirmComponent;
  let fixture: ComponentFixture<ModelOndutyConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelOndutyConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelOndutyConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
