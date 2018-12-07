import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelQuoteConfirmComponent } from './model-quote-confirm.component';

describe('ModelQuoteConfirmComponent', () => {
  let component: ModelQuoteConfirmComponent;
  let fixture: ComponentFixture<ModelQuoteConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelQuoteConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelQuoteConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
