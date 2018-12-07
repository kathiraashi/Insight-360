import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelConfirmConfigComponent } from './model-confirm-config.component';

describe('ModelConfirmConfigComponent', () => {
  let component: ModelConfirmConfigComponent;
  let fixture: ComponentFixture<ModelConfirmConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelConfirmConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelConfirmConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
