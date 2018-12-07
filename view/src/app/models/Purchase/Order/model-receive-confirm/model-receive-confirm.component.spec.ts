import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelReceiveConfirmComponent } from './model-receive-confirm.component';

describe('ModelReceiveConfirmComponent', () => {
  let component: ModelReceiveConfirmComponent;
  let fixture: ComponentFixture<ModelReceiveConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelReceiveConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelReceiveConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
